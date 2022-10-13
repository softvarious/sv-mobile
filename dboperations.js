var config = require('./dbconfig');
const sql = require('mssql');

// Get Products
async function getProducts() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM PRODUCT WHERE ACTIVE = 1");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// Get Accounts
async function getAccounts() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM account");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// Get Area
async function getAreas() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM AREA");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// Get Sub Area
async function getSubAreas() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM SUB_AREA");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// Get ct_cate
async function getCt_cate() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM CT_CATE");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}
// Get ct_type
async function getCt_type() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM CT_TYPE");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// Get Users
async function getUser() {
    try {
        let pool = await sql.connect(config);
        let userData = await pool.request().query("SELECT * FROM mob_user ");
        return userData.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

// Login Users
async function login(req, res) {
    const data = req.body;
    try {
        await sql.connect(config, async err => {
            if (err) {
                return res.json({ msg: 'Connection Error' });
            }
            else {
                await sql.query(`select * from mob_user`, async (err, results) => {
                    if (err) {
                        return res.json({ msg: err.message });
                    }
                    else {
                        const found = await results.recordset.find(
                            element =>
                                element.user_name.replace(/\s+/g, ' ').trim() === data.user_name &&
                                element.password.replace(/\s+/g, ' ').trim() === data.password,
                        );
                        if (found !== undefined) {
                            console.log(results);
                            return res.json({
                                code: 200,
                                msg: 'success',
                                user_data: found,
                            });
                        }
                        else {
                            return res.json({
                                msg: 'Incorrect User or Password',
                            });
                        }
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

// get Updated User
async function getUpdUser(req, res) {
    const data = req.body;
    try {
        await sql.connect(config, async err => {
            if (err) {
                return res.json({ msg: 'Connection Error' });
            }
            else {
                await sql.query(`select * from mob_user`, async (err, results) => {
                    if (err) {
                        return res.json({ msg: err.message });
                    }
                    else {
                        const found = await results.recordset.find(
                            element =>
                                // element.user_name.replace(/\s+/g, ' ').trim() === data.user_name &&
                                element.sm_code.replace(/\s+/g, ' ').trim() === data.sm_code,
                        );
                        if (found !== undefined) {
                            console.log(results);
                            return res.json({
                                code: 200,
                                msg: 'success',
                                user_data: found,
                            });
                        }
                        else {
                            return res.json({
                                msg: 'User not Found',
                            });
                        }
                    }
                });
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}

// Update User info
async function updateUser(req, res) {
    let arrangeData = req.body;
    let makeData = {
        last_sync: arrangeData.last_sync,
        sm_code: arrangeData.sm_code,
    };

    try {
        await sql.connect(config, async err => {
            if (err) {
                return 'something went wrong';
            }
            else {
                let update = `UPDATE mob_user SET status=1, last_sync='${makeData.last_sync}' WHERE sm_code='${makeData.sm_code}';`;
                await sql.query(update, async (err, results) => {
                    if (err) {
                        return res.json({ code: 500, message: err.message });
                    }
                    console.log("result ", results.rowsAffected);
                    return res.json({ code: 200, message: results.message });
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

// Insert Accounts
async function setAccounts(req, res) {
    let arrangeData = req.body;
    let makeData = {
        ac_code: arrangeData.ac_code,
        ac_name: arrangeData.ac_name,
        addr1: arrangeData.addr1,
        addr2: arrangeData.addr2,
        city: arrangeData.city,
        cat: arrangeData.cat,
        cu_type: arrangeData.cu_type,
        area_code: arrangeData.area_code,
        sub_area: arrangeData.sub_area,
        lic_no: arrangeData.lic_no,
        lic_exp: arrangeData.lic_exp,
        ntn_no: arrangeData.ntn_no,
        gst_no: arrangeData.gst_no,
        tell_no1: arrangeData.tell_no1,
        tell_no2: arrangeData.tell_no2,
        con_per: arrangeData.con_per,
        sm_code: arrangeData.sm_code,
        i_time: arrangeData.i_time,
        date: arrangeData.date,
    };

    try {
        await sql.connect(config, async err => {
            if (err) {
                return 'something went wrong';
            }
            else {
                const sqlquery =
                    "INSERT INTO ch_account (AC_CODE, AC_NAME, ADDR1, ADDR2, CITY, CAT, CU_TYPE, AREA_CODE, SUB_AREA, lic_no, lic_exp, NTN_NO, GST_NO, TELL_NO1, TELL_NO2, CON_PER, sm_code, i_time, date) VALUES ('" +
                    makeData.ac_code +
                    "','" +
                    makeData.ac_name +
                    "','" +
                    makeData.addr1 +
                    "','" +
                    makeData.addr2 +
                    "','" +
                    makeData.city +
                    "','" +
                    makeData.cat +
                    "','" +
                    makeData.cu_type +
                    "','" +
                    makeData.area_code +
                    "','" +
                    makeData.sub_area +
                    "','" +
                    makeData.lic_no +
                    "','" +
                    makeData.lic_exp +
                    "','" +
                    makeData.ntn_no +
                    "','" +
                    makeData.gst_no +
                    "','" +
                    makeData.tell_no1 +
                    "','" +
                    makeData.tell_no2 +
                    "','" +
                    makeData.con_per +
                    "','" +
                    makeData.sm_code +
                    "','" +
                    makeData.i_time +
                    "','" +
                    makeData.date +
                    "')";
                await sql.query(sqlquery, (err, results) => {
                    if (err) {
                        return res.json({ message: err.message });
                    }
                    else {
                        console.log("result ", results.rowsAffected);
                        return res.json({ message: results.message });
                    }
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

// Insert Ord
async function setOrd(req, res) {
    let arrangeData = req.body;
    console.log("arrangeData", arrangeData);
    let makeData = {
        ord_no: arrangeData.ord_no,
        ac_code: arrangeData.ac_code,
        ord_amt: arrangeData.ord_amt,
        lat: arrangeData.lat,
        long: arrangeData.long,
        dil_time: arrangeData.dil_time,
        date: arrangeData.date,
        time: arrangeData.time,
        sm_code: arrangeData.sm_code,
        i_time: arrangeData.i_time,
    };

    try {
        await sql.connect(config, async err => {
            if (err) {
                return 'something went wrong';
            }
            else {
                const sqlquery =
                    "INSERT INTO ord (ord_no, ac_code, ord_amt, lat, long, Dil_time, Date, Time, sm_code, i_time) VALUES ('" +
                    makeData.ord_no +
                    "','" +
                    makeData.ac_code +
                    "','" +
                    makeData.ord_amt +
                    "','" +
                    makeData.lat +
                    "','" +
                    makeData.long +
                    "','" +
                    makeData.dil_time +
                    "','" +
                    makeData.date +
                    "','" +
                    makeData.time +
                    "','" +
                    makeData.sm_code +
                    "','" +
                    makeData.i_time +
                    "')";
                await sql.query(sqlquery, (err, results) => {
                    if (err) {
                        return res.json({ message: err.message });
                    }
                    else {
                        console.log("result ", results.rowsAffected);
                        return res.json({ message: results.message });
                    }
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

// Insert Ord_detail
async function setOrd_deta(req, res) {
    let arrangeData = req.body;
    let makeData = {
        ord_no: arrangeData.ord_no,
        pr_code: arrangeData.pr_code,
        qty: arrangeData.qty,
        bonus: arrangeData.bonus,
        price: arrangeData.price,
        per: arrangeData.per,
        qdis: arrangeData.qdis,
        total: arrangeData.total,
        sm_code: arrangeData.sm_code,
        i_time: arrangeData.i_time,
        date: arrangeData.date,
    };
    try {
        await sql.connect(config, async err => {
            if (err) {
                return 'something went wrong';
            }
            else {
                const sqlquery =
                    "INSERT INTO ord_deta (ord_no, pr_code, qty, bonus, price, per, qdis, total, sm_code, i_time, date) VALUES ('" +
                    makeData.ord_no +
                    "','" +
                    makeData.pr_code +
                    "','" +
                    makeData.qty +
                    "','" +
                    makeData.bonus +
                    "','" +
                    makeData.price +
                    "','" +
                    makeData.per +
                    "','" +
                    makeData.qdis +
                    "','" +
                    makeData.total +
                    "','" +
                    makeData.sm_code +
                    "','" +
                    makeData.i_time +
                    "','" +
                    makeData.date +
                    "')";
                await sql.query(sqlquery, (err, results) => {
                    if (err) {
                        return res.json({ message: err.message });
                    }
                    else {
                        console.log("result ", results.rowsAffected);
                        return res.json({ message: results.message });
                    }
                });
            }
        })
    }
    catch (error) {
        console.log(error);
    }
}

// sql.connect(config, function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sqlquery = "INSERT INTO ch_account (AC_CODE, AC_NAME) VALUES ('01', 'Hassan'),('02', 'Qamar'),('03', 'Mohsin'),('04', 'Ruman')";
//     // var elements = [
//     //     ('01', 'Hassan'),
//     //     ('02', 'Qamar'),
//     //     ('03', 'Mohsin'),
//     //     ('04', 'Ruman')
//     // ]
//     sql.query(sqlquery, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });
// function for insert users by store Procedure

// async function addUsers(user) {
//     try {
//         let pool = await sql.connect(config);
//         let insertUser = await pool.request()
//             .input('user_name', sql.Int, user.user_name)
//             .input('user_psw', sql.Int, user.user_psw)
//             .input('w_code', sql.Int, user.w_code)
//             .input('admin', sql.Int, user.admin)
//             .execute('InsertUsers');
//         return insertUser.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }


module.exports = {
    login: login,
    getProducts: getProducts,
    updateUser: updateUser,
    getAccounts: getAccounts,
    getAreas: getAreas,
    getSubAreas: getSubAreas,
    getUser: getUser,
    getCt_type: getCt_type,
    getCt_cate: getCt_cate,
    setAccounts: setAccounts,
    setOrd: setOrd,
    setOrd_deta: setOrd_deta,
    getUpdUser: getUpdUser,
    //addUsers : addUsers
}