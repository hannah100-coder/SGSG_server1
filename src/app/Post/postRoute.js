module.exports = function(app){
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //2.1 게시글 작성 API
    app.post('/app/post/createnewpost', post.postNewPost);

    //2.4 전체 게시글 조회 API
    //app.get('/app/post/allposts/:userIdx', post.getAllPosts);
    app.get("/app/posts/:userIdx", post.getPostsByTitle);

    //2.5 제목 같은 게시글 조회 - 리스트 API
    app.get('/app/post/sametitleposts/:userIdx', post.getSameTitlePosts);

    //2.6 게시글 조회 - 개별 API
    app.get('/app/post/eachpost/:userIdx/:postIdx', post.getEachPost);

    //2.7 카테고리별로 게시글 조회 API
    app.get('/app/post/postsbycategory', post.getPostsByCategory);


    // // 0. 테스트 API
    // // app.get('/app/test', user.getTest)
    //
    // // 1. 유저 생성 (회원가입) API
    // app.post('/app/users', user.postUsers);
    //
    // // 2. 유저 조회 API (+ 검색)
    // app.get('/app/users',user.getUsers);
    //
    // // 3. 특정 유저 조회 API
    // app.get('/app/users/:userId', user.getUserById);
    //
    //
    // // 아래 부분은 7주차에서 다룸.
    // // TODO: After 로그인 인증 방법 (JWT)
    // // 로그인 하기 API (JWT 생성)
    // app.post('/app/login', user.login);
    //
    // // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    // app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API