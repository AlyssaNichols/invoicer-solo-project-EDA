const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET ROUTE
router.get("/", (req, res) => {
  console.log("USER:", req.user)
  console.log("GET /api/companies");
  pool
    .query(`SELECT * FROM "companies" WHERE "isdeleted" = false;`)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/archived", error);
      res.sendStatus(500);
    });
});

// POST ROUTE
router.post("/", (req, res) => {
  const company = req.body;
  console.log(req.body);
  const queryText = `
      INSERT INTO "companies" ("company_name", "address", "city", "state", "zip", "email", "phone", "url")
      VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8 );`;
  pool
    .query(queryText, [
      company.companyName,
      company.address,
      company.city,
      company.state,
      company.zip,
      company.email,
      company.phone,
      company.url
    ])
    .then((response) => {s
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error POSTing company", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  pool
    .query(
      `UPDATE "companies" SET isdeleted = true WHERE id = $1;`,
      [req.params.id]
    )
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/companies", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const queryText = `UPDATE "companies"
  SET "company_name" = $1, "address" = $2,
      "city" = $3,
      "state" = $4,
      "zip" = $5,
      "phone" = $6,
      "email" = $7
  WHERE "id" = $8;`;
  pool
    .query(queryText, [
      req.body.company_name,
      req.body.address,
      req.body.city,
      req.body.state,
      Number(req.body.zip),
      Number(req.body.phone),
      req.body.email,
      req.params.id,
    ])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error saving to database", err);
      res.sendStatus(500);
    });
});


module.exports = router;
