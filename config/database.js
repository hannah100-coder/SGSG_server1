const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'cmchackathondb.cxcw5prmxvi7.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'hannah100',
    database: 'SGSG_DB'
});

module.exports = {
    pool: pool
};