
// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

async function insertNewPost(connection, insertNewPostParams) {
    const insertNewPostQuery = `
        INSERT INTO Post(userIdx, title, categoryIdx, date, place, description) 
        VALUES (?, ?, ?, ?, ?, ?);
    `;

    const [insertNewPostResult] = await connection.query(insertNewPostQuery, insertNewPostParams);

    return insertNewPostResult;
}

async function insertNewPostImgUrl(connection, insertImgUrlParams) {
    const insertNewPostImgUrlQuery = `
        INSERT INTO ImgUrl(postIdx, imgUrl) 
        VALUES (?, ?);
    `;
    const [insertNewPostImgUrlResult] = await connection.query(insertNewPostImgUrlQuery, insertImgUrlParams);

    return insertNewPostImgUrlResult;
}


// async function selectAllPosts(connection, userIdx) {
//     const selectAllPostsQuery = `
//         SELECT p.postIdx, c.categoryIdx, c.categoryName, p.title, p.date, i.imgUrlIdx, i.imgUrl
//         FROM Post p
//         JOIN Category c
//         ON p.categoryIdx = c.categoryIdx
//         JOIN ImgUrl i
//         ON p.postIdx = i.postIdx
//         WHERE p.userIdx = ?
//         GROUP BY postIdx
//         ORDER BY p.postIdx DESC;
//     `;
//
//     const [selectAllPostsResult] = await connection.query(selectAllPostsQuery, userIdx);
//     return selectAllPostsResult;
// }

//2.4
async function getTitleList(connection, userIdx) {
    const getTitleFromPosts = `
        SELECT title
        FROM Post
        WHERE userIdx=?
        group by title;
    `;
    const [names] = await connection.query(getTitleFromPosts, userIdx);

    return names;
}

async function selectUserPosts(connection, selectUserPostsParams) {
    const getPostRows = `
        SELECT p.postIdx,p.title,p.date,p.categoryIdx,c.categoryName,j.imgUrl
        FROM Post as p
                 Join Category as c
                      On p.categoryIdx = c.categoryIdx
                 Join ImgUrl as j
                      On p.postIdx = j.postIdx
        WHERE p.userIdx=? and p.title=?
        group by postIdx;
        `;

    const [item] = await connection.query(getPostRows, selectUserPostsParams);
    console.log("dao_item: ", item);
    return item;
}



async function selectPostsBySameTitle(connection, selectPostsBySameTitleParams) {
    //console.log("dao: ", selectPostsBySameTitleParams);
    const selectPostsBySameTitleQuery = `
        SELECT p.postIdx, c.categoryIdx, c.categoryName, p.title, p.date, i.imgUrlIdx, i.imgUrl
        FROM Post p
        JOIN Category c
        ON p.categoryIdx = c.categoryIdx
        JOIN ImgUrl i
        ON p.postIdx = i.postIdx
        WHERE p.userIdx = ? AND p.title = ?
        GROUP BY postIdx
        ORDER BY p.postIdx DESC;
    `;

    const [selectPostsBySameTitleResult] = await connection.query(selectPostsBySameTitleQuery, selectPostsBySameTitleParams);
    return selectPostsBySameTitleResult;
}

async function selectEachPost(connection, selectEachPostParams) {
    const selectEachPostQuery = `
        SELECT postIdx, title, place, date, description 
        FROM Post 
        WHERE userIdx = ? AND postIdx = ?;
    `;

    const [selectEachPostResult] = await connection.query(selectEachPostQuery, selectEachPostParams);
    return selectEachPostResult[0];
}

async function selectEachPostImgUrl(connection, selectEachPostImgParams) {
    const selectEachPostImgUrlQuery = `
        SELECT imgUrlIdx, imgUrl 
        FROM ImgUrl 
        WHERE postIdx = ?;
    `;

    const [selectEachPostResult] = await connection.query(selectEachPostImgUrlQuery, selectEachPostImgParams);
    return selectEachPostResult;
}


async function getTitleListByCategory(connection, userIdx, categoryIdx) {
    const getTitleFromPosts = `
        SELECT title
        FROM Post
        WHERE userIdx=? and categoryIdx = ?
        group by title;
    `;
    const [names] = await connection.query(getTitleFromPosts, userIdx);

    return names;
}


async function selectPostsByCategory(connection, selectPostsByCategoryParams) {
    const selectPostsByCategoryQuery = `
        SELECT p.postIdx, c.categoryIdx, c.categoryName, p.title, p.date, i.imgUrlIdx, i.imgUrl
        FROM Post p
        JOIN Category c
        ON p.categoryIdx = c.categoryIdx
            JOIN ImgUrl i
            ON p.postIdx = i.postIdx
        WHERE p.userIdx = ? and p.categoryIdx = ?
        GROUP BY postIdx
        Order By p.postIdx Desc;
    `;

    const [selectPostsByCategoryResult] = await connection.query(selectPostsByCategoryQuery, selectPostsByCategoryParams);
    return selectPostsByCategoryResult;
}


module.exports = {
    insertNewPost,
    insertNewPostImgUrl,
    //selectAllPosts,
    selectPostsBySameTitle,
    selectEachPost,
    selectEachPostImgUrl,
    selectPostsByCategory,

    //2.4
    getTitleList,
    selectUserPosts,

    getTitleListByCategory
};
