const jwtMiddleware = require("../../../config/jwtMiddleware");
const catProvider = require("./catProvider");
const catService = require("./catService");
const userProvider = require("../User/userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const baseResponseStatus = require("../../../config/baseResponseStatus");

/**
 * API No. 3.1
 * API Name : 카테고리 생성 API
 * [POST] /app/category/create
 */
exports.createCat = async function (req, res) {
    /**
     * jwt - userIdx, jwt
     */

    const userIdx = req.params.userIdx;
    const category = req.body.category;

    if (!userIdx) {
        return res.send(errResponse(baseResponse.CAT_USERIDX_EMPTY));
    } else if (userIdx < 1) {
        return res.send(errResponse(baseResponse.USER_USERIDX_RANGE));
    }

    // 사용자 존재 여부 확인
    const userExistResult = await userProvider.userExist(userIdx);

    if (userExistResult.length < 1) {
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
    }

    // 카테고리 만들기
    const catCreate = await catProvider.catCreate(userIdx, category);
    return res.send(errResponse(baseResponse.SUCCESS));
}

/**
 * API No. 3.2
 * API Name : 카테고리 조회 API
 * [GET] /app/category/view/:userIdx
 */
exports.viewCat = async function (req, res) {
    /**
     * Path Variable : userIdx
     */

    const userIdx = req.params.userIdx;
    
    // 사용자 존재 여부 확인
    const userExistResult = await userProvider.userExist(userIdx);

    if (userExistResult.length < 1) {
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
    }

    // 카테고리 조회
    const categoryViewPinned = await catProvider.catViewPinned(userIdx);
    const categoryViewNotPinned = await catProvider.categoryViewNotPinned(userIdx);

    return res.send(response(baseResponse.SUCCESS, [categoryViewPinned, categoryViewNotPinned]));
}

/**
 * API No. 3.3
 * API Name : 카테고리 고정 / 해제 API
 * [PATCH] /app/category/pin/:categoryIdx
 */
exports.pinCat = async function (req, res) {
    /**
     * Path Variable : userIdx, categoryIdx
     */

    const categoryIdx = req.params.categoryIdx;
    const userIdx = req.params.userIdx;

    const currentCatPin = await catProvider.currentPin(categoryIdx);

    if (currentCatPin.pinned == 0) {
        const categoryPinResult = await catService.catPinIn(categoryIdx);
    } else {
        const categoryPinResult = await catService.catPinOut(categoryIdx);
    }

    return res.send(errResponse(baseResponse.SUCCESS));
}