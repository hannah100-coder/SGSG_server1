module.exports = function (app) {
    const cat = require('./catController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    
    // 3.1 카테고리 생성 API
    app.post('/app/category/create/:userIdx', cat.createCat);

    // 3.2 카테고리 조회 API
    app.get('/app/category/view/:userIdx', cat.viewCat);

    // 3.3 카테고리 즐겨찾기 / 해제 API
    app.patch('/app/category/pin/:userIdx/:categoryIdx', cat.pinCat);
};