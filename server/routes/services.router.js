const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
    console.log("GET /api/services");
    pool
      .query('SELECT * from "services";')
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log("Error GET /api/services", error);
        res.sendStatus(500);
      });
  });

// POST ROUTE
router.post('/', (req, res) => {
    router.post("/", (req, res) => {
        const service = req.body;
        console.log(req.body);
        console.log(req.user);
        const queryText = `
        INSERT INTO services ("service")
        VALUES (
            $1);`;
        pool
          .query(queryText, [service.service])
          .then((response) => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log("error POSTing invoice", err);
            res.sendStatus(500);
          });
      });
});

module.exports = router;
