const expressJwt = require('express-jwt');


function authJwt(){
    const secret = process.env.JWT_SECRET;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path:[
            {url: '/api/products', methods:['GET', 'OPTIONS']},
            '/api/users/login',
            '/api/users/register',
            '/api/users/:id'


        ]
    })
}

module.exports = authJwt;