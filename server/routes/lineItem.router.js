const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET /api/lineItems");
  pool
    .query('SELECT * from "line_item";')
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/lineItem", error);
      res.sendStatus(500);
    });
});

router.post("/", async (req, res) => {
  const { lineItem, invoice } = req.body;

  try {
    // Start a PostgreSQL transaction
    const client = await pool.connect();
    await client.query("BEGIN");

    // Insert the line item
    const lineItemQueryText = `
                INSERT INTO "line_item" ("service_id", "date_performed", "service_price", "invoice_id")
                VALUES ($1, $2, $3, $4)
                RETURNING "id";`;

    const lineItemResult = await client.query(lineItemQueryText, [
      lineItem.service_id,
      lineItem.date_performed,
      lineItem.service_price,
      invoice.id, // Use the provided invoice ID to associate the line item
    ]);

    const lineItemId = lineItemResult.rows[0].id;

    // Commit the transaction
    await client.query("COMMIT");
    client.release();

    res.status(201).json({ id: lineItemId });
  } catch (err) {
    // Rollback the transaction if an error occurs
    console.error("Error POSTing line_item", err);
    res.status(500).json({ error: "Failed to insert line item" });
  }
});

router.delete("/:id", (req, res) => {
  pool
    .query('DELETE FROM "line_item" WHERE id=$1', [req.params.id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/lineItems", error);
      res.sendStatus(500);
    });
});

module.exports = router;
