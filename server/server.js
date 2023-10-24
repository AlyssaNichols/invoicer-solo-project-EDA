const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const sgMail = require("@sendgrid/mail");
const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const customersRouter = require("./routes/customers.router");
const servicesRouter = require("./routes/services.router");
const lineItemRouter = require("./routes/lineItem.router");
const invoiceRouter = require("./routes/invoice.router");
const invoiceHistory = require("./routes/invoiceHistory.router");
const employeeRouter = require("./routes/employees.router");
const archivedRouter = require("./routes/archivedCustomer.router");
const companiesRouter = require("./routes/companies.router");
const financesRouter = require("./routes/financialData.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', (req, res) => {
// Get the recipient email from the request body
  const msg = {
    to: req.body.recipient, // Use the recipient email from the request body
    from: 'Grassmastersfargo@gmail.com',
    subject: req.body.subject,
    text: req.body.html,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send('Email sent successfully');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    });
});
// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/customers", customersRouter);
app.use("/api/services", servicesRouter);
app.use("/api/lineItems", lineItemRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/invoiceHistory", invoiceHistory);
app.use("/api/employees", employeeRouter);
app.use("/api/archived", archivedRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/finances", financesRouter);



// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
