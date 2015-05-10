
// mysql database config
module.exports = {
  connection: {
    host: 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'juliet',
    database: process.env.DB_NAME || 'myblog',
    charset: 'utf8'
  }
};