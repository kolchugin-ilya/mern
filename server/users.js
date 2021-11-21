const mysql = require("mysql");
const express = require('express');
const users = express.Router();
const getConnection = require('./connection/connection');

users.get("/allUsers", async (req,res) => {
    let id = 1;
    getConnection( async (err, connection) => {
        if (err) throw err;
        const search_query = mysql.format(`SELECT * FROM users WHERE ID=${id}`)
        await connection.query (search_query, async (err, result) => {
            connection.release();
            if (err) throw (err)
            console.log(result)
            res.send(result + req.session.userinfo)
        })
    })
})

// router.post("/newUser", async (req,res) => {
//     const user = "имя2";
//     const hashedPassword = 666;
//     db.getConnection( async (err, connection) => {
//         if (err) throw (err)
//         const sqlInsert = "INSERT INTO users (name, password) VALUES (?,?)"
//         const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
//         if (err) throw (err)
//         await connection.query (insert_query, (err, result)=> {
//             connection.release()
//             if (err) throw (err)
//             console.log ("--------> Created new User")
//             res.sendStatus(201)
//         })
//     })
// })

module.exports = users;