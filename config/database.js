let {
  db: { username, password, database, host },
} = require('./index');

console.log(password);

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
