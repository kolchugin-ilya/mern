const getConnection = require('../connection/connection');
const mysql = require("mysql");

class dataController {
    async fetchData(req, res) {
        try {
            const {id} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в fetchData"})
                }
                const search_query = (id)?mysql.format(`select * from data where id='${id}'`):mysql.format(`select * from data`)
                await connection.query(search_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка в fetchData"})
                    }
                    res.json({result: result})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка fetchData"})
        }
    }

    async insertData(req, res) {
        try {
            const {col1,col2,col3} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в insertData"})
                }
                const search_query = mysql.format(`select * from data`)
                const insert_query = mysql.format(`insert into data(datapos1, datapos2, datadate, active) values('${col1}','${col2}','${col3}',1)`);
                await connection.query(insert_query, async (err, result) => {
                    if (err) {
                        res.status(400).json({message: "Ошибка в insertData"})
                    }
                    await connection.query(search_query, async (err, result) => {
                        connection.release()
                        if (err) {
                            res.status(400).json({message: "Ошибка в fetchData"})
                        }
                        res.json({result: result})
                    })
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка fetchData"})
        }
    }

    async deleteData(req, res) {
        try {
            const {id} = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в insertData"})
                }
                const delete_query = mysql.format(`update data set (active='0') where id='${id}'`);
                await connection.query(delete_query, async (err, result) => {
                    if (err) {
                        res.status(400).json({message: "Ошибка в deleteData"})
                    }
                    res.json({message: "Удалено."})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка deleteData"})
        }
    }
}

module.exports = new dataController()
