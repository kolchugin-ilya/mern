const getConnection = require('../connection/connection');
const mysql = require("mysql");

class dataController {

    async readData(req, res) {
        try {
            const { table, columns } = req.body;
            getConnection(async (err, connection) => {
                if (err) {
                    res.status(400).json({message: "Ошибка при подключении в readData"})
                }
                const search_query = mysql.format(`SELECT ${columns} from ${table}`)
                await connection.query(search_query, async (err, result) => {
                    connection.release()
                    if (err) {
                        res.status(400).json({message: "Ошибка в readData"})
                    }
                    res.json({result: result})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка чтения из базы данных"})
        }
    }

    async createData(req, res) {
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
                            res.status(400).json({message: "Ошибка создания записи"})
                        }
                        res.json({result: result})
                    })
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка insertData"})
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
                        res.status(400).json({message: "Ошибка удаления"})
                    }
                    res.json({message: "Удалено."})
                })
            })
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка deleteData"})
        }
    }

    async updateData(req, res) {
        try {
        } catch (e) {
            console.log(e)
            res.send(400).json({message: "Ошибка обновления"})
        }
    }
}

module.exports = new dataController()
