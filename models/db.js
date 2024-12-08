require("dotenv").config();
console.log(process.env.DB_HOST);

const mysql = require("mysql2");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL === "true" ? true : false,
});

connection.getConnection((err, conn) => {
  if (err) {
    console.error("Erro de conexão com o banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados com sucesso!");
  conn.release();
});

module.exports = connection;
