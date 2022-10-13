
const config = {
    user: 'softvous_mobile_db',
    password: 'Mobile123@',
    server: '192.185.7.6',
    database: 'softvous_mobile_db',
    synchronize: true,
    trustServerCertificate: true, //the IP of the machine where SQL Server runs

    options: {
        database: 'softvous_mobile_db',
        port: 1433, //the username above should have granted permissions in order to access this DB.
        debug: {
            packet: false,
            payload: false,
            token: false,
            data: false,
        },
        encrypt: false,
    },
};


// const config = {
//     user: 'sa',
//     password: '12345',
//     server: 'DESKTOP-ETJGGM2',
//     database: 'test_db',
//     //synchronize: true,
//     options: {
//         trustedconnection: true,
//         enableArithAort: true,
//         instancename: 'MSSQLSERVER'
//     },
//     port: 1433
// }

module.exports = config;