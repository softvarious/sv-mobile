const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

// router.use((request, response, next) => {
//     console.log('middleware');
//     next();
// })
// Call back Function of Get Products
router.get("/products", async (request, response) => {

    try {
        const getP = await dboperations.getProducts();
        response.json(getP)
    } catch (error) {
        console.log(error);
    };

})

// Call back Function of Get Accounts
router.get('/accounts', async (request, response) => {

    try {
        const getA = await dboperations.getAccounts();
        response.json(getA);
    } catch (error) {
        console.log(error)
    }

})

// Call back Function of Get Areas
router.get('/areas', async (request, response) => {

    try {
        const getArea = await dboperations.getAreas();
        response.json(getArea);
    } catch (error) {
        console.log(error)
    }

})

// Call back Function of Get Sub Areas
router.get('/sub_areas', async (request, response) => {

    try {
        const sub_Area = await dboperations.getSubAreas();
        response.json(sub_Area);
    } catch (error) {
        console.log(error)
    }

})

// Call back Function of Get User
router.get('/users', async (request, response) => {

    try {
        const getU = await dboperations.getUser();
        response.json(getU);
    } catch (error) {
        console.log(error)
    }

})

// Call back Function of Get ct_cate
router.get('/ct_cate', async (request, response) => {

    try {
        const getCT = await dboperations.getCt_cate();
        response.json(getCT);
    } catch (error) {
        console.log(error);
    }

})

// Call back Function of Get ct_type
router.get('/ct_type', async (request, response) => {

    try {
        const getCtType = await dboperations.getCt_type();
        response.json(getCtType);
    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (request, response) => {
    try {
        if (!request.body) {
            return response.sendStatus(404);
        }
        else {
            return await dboperations.login(request, response);
        }
    } catch (error) {
        console.log(error);
    }
});

// Call Back function of Updated User
router.post("/upd_User", async (request, response) => {
    try {
        if (!request.body) {
            return response.sendStatus(404);
        }
        else {
            return await dboperations.getUpdUser(request, response);
        }
    } catch (error) {
        console.log(error);
    }
});

// Call back Function of Insert users
router.post('/update_user', async (request, response) => {
    try {
        if (!request.body) {
            return response.sendStatus(404);
        }
        else {
            return await dboperations.updateUser(request, response)
        }
    } catch (error) {
        console.log(error);
    }
});

// Call back Function of Insert accounts
router.post('/insert_acc', async (request, response) => {
    try {
        if (!request.body) {
            return response.sendStatus(404);
        }
        else {
            return await dboperations.setAccounts(request, response)
        }
    } catch (error) {
        console.log(error);
    }
});

// Call back Function of Insert orders
router.post('/insert_ord', async (request, response) => {
    try {
        if (!request.body) {
            return response.sendStatus(404);
        }
        else {
            return await dboperations.setOrd(request, response)
        }
    } catch (error) {
        console.log(error);
    }
});

// Call back Function of Insert order details
router.post('/insert_ord_deta', async (request, response) => {
    try {
        if (!request.body) {
            return response.sendStatus(404);
        }
        else {
            return await dboperations.setOrd_deta(request, response)
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;


// var port = process.env.PORT || 8090;
// app.listen(port);
// console.log('User API is running at ' + port);

// Developed By: Hassaan Ali
// Powered By: Softvarious.com