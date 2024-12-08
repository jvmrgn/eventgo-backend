const db = require("../models/db");

exports.getAllUsers = (req, res) => {
  db.query("SELECT * FROM pessoas", (err, results) => {
    if (err) {
      res.status(500).json({error: "Erro ao buscar usuários."});
    } else {
      res.json(results);
    }
  });
};

exports.createUser = (req, res) => {
  const {nickname, password, full_name, email, user_type} = req.body;
  const query = `
    INSERT INTO pessoas (nickname, password, full_name, email, user_type) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [nickname, password, full_name, email, user_type], (err) => {
    if (err) {
      res.status(500).json({error: "Erro ao criar usuário."});
    } else {
      res.status(201).json({message: "Usuário criado com sucesso!"});
    }
  });
};
