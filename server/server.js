const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const customersRouter = require('./routes/customers.router')
const servicesRouter = require('./routes/services.router')
const lineItemRouter = require('./routes/lineItem.router')
const invoiceRouter = require("./routes/invoice.router");
const invoiceHistory  = require('./routes/invoiceHistory.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use("/api/customers", customersRouter);
app.use("/api/services", servicesRouter);
app.use("/api/lineItem", lineItemRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/invoiceHistory", invoiceHistory);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
