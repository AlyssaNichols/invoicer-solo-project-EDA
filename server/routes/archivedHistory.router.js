const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET
router.get("/", (req, res) => {
  console.log("GET /api/invoice");
  pool
    .query(
      `SELECT i.id AS id,
      json_agg(json_build_object('id', li.id, 'type', s.service, 'date', li.date_performed, 'price', li.service_price )) AS service_data,
      i.total_price,
      date_issued,
      date_paid,
      i.customer_id,
      c.first_name,
      c.last_name,
      c.address,
      c.city,
      c.state,
      c.zip,
      c.email,
      c.phone,
      i.isdeleted
FROM invoice i
LEFT JOIN line_item li ON i.id = li.invoice_id
LEFT JOIN services AS s ON li.service_id = s.id
LEFT JOIN customers AS c ON i.customer_id = c.id
WHERE i.isdeleted = true
GROUP BY i.id, i.total_price, i.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone
ORDER BY i.id desc;`
    )
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log("Error GET /api/invoice", error);
      res.sendStatus(500);
    });
});



module.exports = router;
