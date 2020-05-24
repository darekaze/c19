"use strict";

const AWS = require("aws-sdk");
const mysql = require("mysql2/promise");
const dbConfig = require("./config/db");

const s3 = new AWS.S3();

module.exports.generateSummary = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("generateSummary: Triggered!");
  const conn = await mysql.createConnection(dbConfig);

  // query database
  const [records] = await conn.execute(`
    SELECT r.*, acc.record_count
    FROM (
      SELECT student_id, count(*) as record_count, max(input_date) as last_input_date
      FROM health_report
      GROUP BY student_id
    ) acc
    INNER JOIN health_report r
    ON r.student_id = acc.student_id AND r.input_date = acc.last_input_date;
  `);

  await conn.end();

  // Process data and generate stats
  const countryCount = {};
  let suspectedCount = 0;
  let confirmedCount = 0;

  records.forEach((record) => {
    const { country, is_suspected, is_confirmed } = record;
    countryCount[country] = (countryCount[country] || 0) + 1;
    suspectedCount += is_suspected;
    confirmedCount += is_confirmed;
  });

  // Upload to S3
  const destParams = {
    Bucket: "comp4442a3darwin",
    Key: "summary.json",
    Body: JSON.stringify(
      {
        updatedAt: new Date().toLocaleString(),
        records,
        countryCount,
        suspectedCount,
        confirmedCount,
      },
      null,
      2
    ),
    ContentType: "application/json",
    CacheControl: "no-cache",
  };
  const s3Response = await s3.putObject(destParams).promise();

  return {
    message: "Function executed successfully!",
    s3Response,
    event,
  };
};
