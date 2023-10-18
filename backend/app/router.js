module.exports = (app) => {
    const { router, controller } = app;

    router.get('/api/', controller.home.index);
    router.post('/api/login', controller.home.login);
    router.get('/api/user/list', controller.user.list);
};
