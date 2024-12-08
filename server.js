require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({message: "API está funcionando corretamente!"});
});

const connection = require("./models/db");
connection.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    process.exit(1);
  } else {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    connection.release();
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
