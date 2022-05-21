const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const catDao = require("./catDao");

exports.catPinIn = async function (categoryIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const catPinResult = await catDao.catPinIn(connection, categoryIdx);
    connection.release();

    return catPinResult;
}

exports.catPinOut = async function (categoryIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const catPinResult = await catDao.catPinOut(connection, categoryIdx);
    connection.release();

    return catPinResult;
}