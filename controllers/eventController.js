const db = require("../models/db");

exports.getAllEvents = (req, res) => {
  db.query("SELECT * FROM eventos", (err, results) => {
    if (err) {
      res.status(500).json({error: "Erro ao buscar eventos."});
    } else {
      res.json(results);
    }
  });
};

exports.createEvent = (req, res) => {
  const {title, description, date, time, location, organizer_id} = req.body;
  const query = `
    INSERT INTO eventos (title, description, date, time, location, organizer_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [title, description, date, time, location, organizer_id],
    (err) => {
      if (err) {
        res.status(500).json({error: "Erro ao criar evento."});
      } else {
        res.status(201).json({message: "Evento criado com sucesso!"});
      }
    }
  );
};
