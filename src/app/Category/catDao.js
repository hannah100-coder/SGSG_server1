async function catCreate(connection, catCreateParams) {
    const catCreateQuery = `
                INSERT INTO Category(userIdx, categoryName)
                VALUE (?, ?);
    `;

    const catCreateResult = await connection.query(catCreateQuery, catCreateParams);

    return catCreateResult;
}

async function catViewPinned(connection, userIdx) {
    const catViewPinnedQuery = `
                SELECT categoryName, categoryIdx
                FROM Category
                WHERE userIdx = ? AND pinned = 1;
    `;

    const catViewPinnedResult = await connection.query(catViewPinnedQuery, userIdx);

    return catViewPinnedResult;
}

async function catViewNotPinned(connection, userIdx) {
    const catViewNotPinnedQuery = `
                SELECT categoryName, categoryIdx
                FROM Category
                WHERE userIdx = ? AND pinned = 0;
    `;

    const catViewNotPinnedResult = await connection.query(catViewNotPinnedQuery, userIdx);

    return catViewNotPinnedResult;
}

async function catPinIn(connection, categoryIdx) {
    const catPinInQuery = `
                UPDATE Category
                SET pinned = 1
                WHERE categoryIdx = ?;
    `;

    const catPinInResult = await connection.query(catPinInQuery, categoryIdx);

    return catPinInResult;
}

async function currentPin(connection, categoryIdx) {
    const currentPinQuery = `
                SELECT pinned
                FROM Category
                WHERE categoryIdx = ?;
    `;

    const currentPinResult = await connection.query(currentPinQuery, categoryIdx);

    return currentPinResult;
}

async function catPinOut(connection, categoryIdx) {
    const catPinInQuery = `
                UPDATE Category
                SET pinned = 0
                WHERE categoryIdx = ?;
    `;

    const catPinInResult = await connection.query(catPinInQuery, categoryIdx);

    return catPinInResult;
}

module.exports = {
    catCreate,
    catViewPinned,
    catViewNotPinned,
    catPinIn,
    currentPin,
    catPinOut,
}