const mysql = require('mysql2/promise')
const dbConfig = require('./dbConfig')
const microCors = require('micro-cors')
const { json, send } = require('micro')

const healthDataInsert = async (req, res) => {
  const { studentId, studentName, country, isSuspected, isConfirmed, bodyTemperature } = await json(req)
  const conn = await mysql.createConnection(dbConfig)

  const sql_stmt = `INSERT INTO public.health_report
    (student_id, input_date, student_name, country, is_suspected, is_confirmed, body_temp)
    VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE
    student_name = ?, country = ?, is_suspected = ?, is_confirmed = ?, body_temp = ?;`

  await conn.query({
    sql: sql_stmt,
    values: [studentId, new Date(), studentName, country, isSuspected, isConfirmed, bodyTemperature,
      studentName, country, isSuspected, isConfirmed, bodyTemperature]
  }, function (error /*, results, fields*/) {
    if (!error) {
      send(res, 200, 'ok')
    } else {
      send(res, 500, error.message)
    }
  });

  conn.end()
}


const cors = microCors({ allowMethods: ['POST', 'OPTIONS'] })
module.exports = cors(healthDataInsert)
