const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const postDao = require("./postDao");
const postProvider = require("./postProvider");

// Provider: Read 비즈니스 로직 처리


//2.4
// exports.retrieveAllPosts = async function(userIdx) {
//     const connection = await pool.getConnection(async (conn) => conn);
//
//     const retrieveAllPostsResult = await postDao.selectAllPosts(connection, userIdx);
//
//     connection.release();
//
//     return retrieveAllPostsResult;
// }

exports.retrieveTitleList = async function (userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const titleListResult = await postDao.getTitleList(connection, userIdx);
    connection.release();

    return titleListResult;
};

exports.retrievePostList = async function (userIdx) {
    const names = await postProvider.retrieveTitleList(userIdx);
    console.log("names", names);
    const connection = await pool.getConnection(async (conn) => conn);

    var postListResult = [];

    for (var i = 0; i < names.length; i++) {
        const item = await postDao.selectUserPosts(
            connection,
            [userIdx,
            names[i].title]
        );
        postListResult.push(item);
    }

    connection.release();
    return postListResult;
};



exports.retrievePostsBySameTitle = async function(userIdx, title) {
    const connection = await pool.getConnection(async (conn) => conn);

    const postsBySameTitleResult = await postDao.selectPostsBySameTitle(connection, [userIdx, title]);

    connection.release();

    return postsBySameTitleResult;

}


exports.retrieveEachPost = async function(userIdx, postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const eachPostResult = await postDao.selectEachPost(connection, [userIdx, postIdx]);
    const eachPostImgResult = await postDao.selectEachPostImgUrl(connection, postIdx);

    connection.release();

    return [eachPostResult, eachPostImgResult];
}

// exports.retrievePostsByCategory = async function(userIdx, categoryIdx) {
//     const connection = await pool.getConnection(async (conn) => conn);
//
//     const postsByCategoryResult = await postDao.selectPostsByCategory(connection, [userIdx, categoryIdx]);
//
//     connection.release();
//
//     return postsByCategoryResult;
// }

exports.retrieveTitleListByCategory = async function (userIdx, categoryIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const titleListByCategoryResult = await postDao.getTitleListByCategory(connection, [userIdx, categoryIdx]);
    connection.release();

    return titleListByCategoryResult;
};

exports.retrievePostListByCategory = async function (userIdx, categoryIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const names = await postProvider.retrieveTitleListByCategory(userIdx, categoryIdx);

    var postListResult = [];

    for (var i = 0; i < names.length; i++) {
        const item = await postDao.selectUserPosts(
            connection,
            [userIdx,
                names[i].title]
        );
        postListResult.push(item);
    }

    connection.release();
    return postListResult;
};



//=============================

exports.retrieveUser = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserId(connection, userId);

    connection.release();

    return userResult[0]; // 한 명의 유저 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};




exports.retrieveUserList = async function (email) {

    //email을 인자로 받는 경우와 받지 않는 경우를 구분하여 하나의 함수에서 두 가지 기능을 처리함

    if (!email) {
        // connection 은 db와의 연결을 도와줌
        const connection = await pool.getConnection(async (conn) => conn);
        // Dao 쿼리문의 결과를 호출
        const userListResult = await userDao.selectUser(connection);
        // connection 해제
        connection.release();

        return userListResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const userListResult = await userDao.selectUserEmail(connection, email);
        connection.release();

        return userListResult;
    }
};

exports.retrieveUser = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userResult = await userDao.selectUserId(connection, userId);

    connection.release();

    return userResult[0]; // 한 명의 유저 정보만을 불러오므로 배열 타입을 리턴하는 게 아닌 0번 인덱스를 파싱해서 오브젝트 타입 리턴
};

exports.emailCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const emailCheckResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
    const connection = await pool.getConnection(async (conn) => conn);
    // 쿼리문에 여러개의 인자를 전달할 때 selectUserPasswordParams와 같이 사용합니다.
    const passwordCheckResult = await userDao.selectUserPassword(
        connection,
        selectUserPasswordParams
    );
    connection.release();
    return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userAccountResult = await userDao.selectUserAccount(connection, email);
    connection.release();

    return userAccountResult;
};