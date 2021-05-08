const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const ngo = require('../../models/Ngo')
const express = require('express')
// const config = require('config')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    resources: [{
        resource: ngo,
        options: {
            listProperties: ['name', 'email', 'register_date', 'contact', 'isVerified'],
            showProperties: ['name', 'email', 'contact', 'register_date', 'hno', 'street', 'city', 'pincode', 'state', 'licence', 'isVerified'],
            editProperties: ['isVerified'],
        },
      }],
  rootPath: '/admin',
})

// const ADMIN = {
//     email: 'test@example.com',
//     password: 'password',
//   }

// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, 
//     {
//     cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
//     cookiePassword: process.env.ADMIN_COOKIE_PASS || 'super-long-admin-cookie-password-for-fetch',
//     authenticate: async (email, password) => {
//             console.log("here")
//             if(email===ADMIN.email && password===ADMIN.password) {
//                 return ADMIN
//             }
//             return null
//         }
//     } 

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router