const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const catDao = require("./catDao");

exports.catCreate = async function (userIdx, category) {

    const catCreateParams = [userIdx, category];

    const connection = await pool.getConnection(async (conn) => conn);

    const catCreateResult = await catDao.catCreate(connection, catCreateParams);
    connection.release();

    return catCreateResult;
}

exports.catViewPinned = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const [catViewPinnedResult] = await catDao.catViewPinned(connection, userIdx);
    connection.release();

    return catViewPinnedResult;
}

exports.categoryViewNotPinned = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const [catViewNotPinnedResult] = await catDao.catViewNotPinned(connection, userIdx);
    connection.release();

    return catViewNotPinnedResult;
}

exports.currentPin = async function (categoryIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const [currentPinResult] = await catDao.currentPin(connection, categoryIdx);
    connection.release();

    return currentPinResult[0];
}