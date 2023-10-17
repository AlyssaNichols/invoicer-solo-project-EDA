import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import customersSaga from './customers.saga';
import servicesSaga from './services.saga';
import invoiceSaga from './invoices.saga';
import lineItemsSaga from './lineItems.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    customersSaga(),
    servicesSaga(),
    invoiceSaga(),
    lineItemsSaga(),
  ]);
}
