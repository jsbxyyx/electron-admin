const index = (ctx) => {
    ctx.body = 'hello electron';
};

const login = (ctx) => {
    const reqBody = ctx.request.body;
    console.log("reqBody", reqBody)
    const name = reqBody.name
    const password = reqBody.password
    ctx.body = { code: 200, data: { name: "admin" } };
}

module.exports = {
    index,
    login
};