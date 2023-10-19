module.exports = (app) => {
    const { router, controller } = app;

    // home
    router.get('/api/', controller.home.index);
    router.post('/api/login', controller.home.login);
    // user
    router.get('/api/user/list', controller.user.list);
};
