
// 새롭게 추가한 함수를 아래 부분에서 export 해줘야 외부의 Provider, Service 등에서 사용가능합니다.

// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, nickname 
                FROM UserInfo;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, nickname 
                FROM UserInfo 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userId) {
  const selectUserIdQuery = `
                 SELECT id, email, nickname 
                 FROM UserInfo 
                 WHERE id = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdQuery, userId);
  return userRow;
}

// userIdx 회원 조회
async function selectUserExist(connection, userIdx) {
  const selectUserExistQuery = `
                  SELECT userIdx
                  FROM User
                  WHERE userIdx = ?;
  `;
  const [userExistRow] = await connection.query(selectUserExistQuery, userIdx);
  return userExistRow;
}

// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(userName, userID, userPassword)
        VALUES (?, ?, ?);
    `;
  const insertUserInfoRow = await connection.query(
    insertUserInfoQuery,
    insertUserInfoParams
  );

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT userID, userName, userPassword, userIdx
        FROM User 
        WHERE userID = ? AND userPassword = ?;`;
  const [selectUserPasswordRow] = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, id) {
  const selectUserAccountQuery = `
        SELECT status, userID
        FROM User 
        WHERE userID = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      id
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}

// id로 회원조회
async function selectUserAccountId(connection, id) {
  const selectUserAccountIdQuery = `
        SELECT userID
        FROM User
        WHERE userID = ?;
  `;
  const [selectUserAccountIdRows] = await connection.query(selectUserAccountIdQuery, id);

  return selectUserAccountIdRows;
}


module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  selectUserExist,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  selectUserAccountId,
};
