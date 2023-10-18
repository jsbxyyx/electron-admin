'use strict';

module.exports = (app) => {
    const { STRING, INTEGER, BIGINT, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        id: { type: BIGINT, primaryKey: true, autoIncrement: true },
        username: STRING(255),
        password: STRING(255),
        name: STRING(255),
        created_at: DATE,
        updated_at: DATE,
    });

    return User;
};