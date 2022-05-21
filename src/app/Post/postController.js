const jwtMiddleware = require("../../../config/jwtMiddleware");
const postProvider = require("../../app/Post/postProvider");
const postService = require("../../app/Post/postService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");


/**
 API No. 2.1
 API Name: 게시글 작성 API
 [GET] title, categoryIdx, date, place, postImgUrl
 */

exports.postNewPost = async function (req, res) {

    /**
     * Body: title, date, place, categoryIdx, description, img
     */
//이미지5개(배열), 제목, 내용, 날짜, 위치, 카테고리 인덱스

    const {userIdx, title, categoryIdx, date, place, description} = req.body;
    let postImgUrl = req.body.postImgUrl;

    if(postImgUrl == null)
        postImgUrl = [];

    const postNewPostResult = await postService.insertNewPost(
        userIdx, title, categoryIdx, date, place, description, postImgUrl
    );

    return res.send(postNewPostResult);


}

/**
 API No. 2.4
 API Name: 전체 게시글 조회 API
 [GET] /app/post/allposts/:userIdx
 */

// exports.getAllPosts = async function (req, res) {
//     const userIdx = req.params.userIdx;
//
//     const allPostsResult = await postProvider.retrieveAllPosts(userIdx);
//
//     return res.send(response(baseResponse.SUCCESS, allPostsResult));
//
// }
exports.getPostsByTitle = async function (req, res) {
    /*
        params: userIdx
      */
        const userIdx = req.params.userIdx;
        const postListResult = await postProvider.retrievePostList(userIdx);

        return res.send(response(baseResponse.SUCCESS, postListResult));
};




/**
 API No. 2.5
 API Name: 같은 타이틀의 게시글 조회 API
 [GET] /app/post/sametitleposts/:userIdx
 */

exports.getSameTitlePosts = async function (req, res) {

    /**
     * Body: title
     */

    const userIdx = req.params.userIdx;
    const title = req.body.title;

    if(!userIdx)
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));


    const postsBySameTitle = await postProvider.retrievePostsBySameTitle(userIdx, title);

    return res.send(response(baseResponse.SUCCESS, postsBySameTitle));
}


/**
 API No. 2.6
 API Name: 게시글 조회 - 개별 API
 [GET] /app/post/eachpost/:userIdx/:postIdx
 */

exports.getEachPost = async function (req, res) {

    const userIdx = req.params.userIdx;
    const postIdx = req.params.postIdx;

    const eachPost = await postProvider.retrieveEachPost(userIdx, postIdx);

    return res.send(response(baseResponse.SUCCESS, eachPost));

}

/**
 API No. 2.7
 API Name: 카테고리별로 게시글 조회 - 개별 API
 [GET] /app/post/postsbycategory/:userIdx/:categoryIdx
 */

exports.getPostsByCategory = async function (req, res) {

    const userIdx = req.params.userIdx;
    const categoryIdx = req.params.categoryIdx;

    //const postsByCategory = await postProvider.retrievePostsByCategory(userIdx, categoryIdx);
    const postsByCategory = await postProvider.retrievePostListByCategory(userIdx, categoryIdx);

    return res.send(response(baseResponse.SUCCESS, postsByCategory));
}


exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname
     */
    const {email, password, nickname} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // createUser 함수 실행을 통한 결과 값을 signUpResponse에 저장
    const signUpResponse = await userService.createUser(
        email,
        password,
        nickname
    );

    // signUpResponse 값을 json으로 전달
    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        // SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" }, 메세지와 함께 userListResult 호출
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 아메일을 통한 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};

/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    // errResponse 전달
    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    // userId를 통한 유저 검색 함수 호출 및 결과 저장
    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    // JWT는 이 후 주차에 다룰 내용
    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};






// JWT 이 후 주차에 다룰 내용
/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
