import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchInvoiceDetails() {
  try {
    const response = yield axios.get(`/api/invoice/details/${action.payload}`);
    console.log("FETCH request invoicesSaga");
    yield put({ type: "SET_INVOICE_DETAILS", payload: response.data[0] });
  } catch {
    console.log("error in fetch invoice details");
  }
}

function* addInvoiceSaga(action) {
  try {
    const history = action.payload.history;
    const response = yield axios.post(
      "/api/invoice",
      action.payload.newInvoice
    );
    console.log("RESPONSE IS", response);
    yield put({ type: "FETCH_INVOICES" });
    history.push(`/invoice/details/${response.data.invoiceId}`);
  } catch (error) {
    console.log("error in add invoice", error);
  }
}

function* deleteInvoiceSaga(action) {
  try {
    yield axios.delete(`/api/invoice/details/${action.payload}`);
    yield put({ type: "FETCH_INVOICES" });
  } catch (error) {
    console.log("error with DELETE saga request", error);
  }
}

export default function* invoiceDetails() {
  yield takeEvery("FETCH_INVOICE_DETAILS", fetchInvoiceDetails);
  yield takeEvery("DELETE_INVOICE", deleteInvoiceSaga);
  yield takeEvery("ADD_INVOICE", addInvoiceSaga);
  // yield takeEvery("FETCH_LINE_ITEMS", fetchLineItemsSaga);
  // yield takeEvery("ADD_LINE_ITEM", addLineItemSaga);
  // yield takeEvery("DELETE_LINE_ITEM", deleteLineItemSaga);
}

//   function* fetchLineItemsSaga() {
//     try {
//       const response = yield axios.get("/api/lineItems");
//       console.log("FETCH request lineItems");
//       yield put({ type: "SET_LINE_ITEMS", payload: response.data });
//     } catch {
//       console.log("error in fetch lineitems");
//     }
//   }

//   function* addLineItemSaga(action) {
//     try {
//       console.log(action.payload);
//       yield axios.post("/api/lineItems", action.payload );
//       yield put({ type: "FETCH_LINE_ITEMS" });
//     } catch (error) {
//       console.log("error in add lineItem", error);
//     }
//   }

//   function* deleteLineItemSaga(action) {
//     try {
//       yield axios.delete(`/api/lineItems/${action.payload}`);
//       yield put({ type: "FETCH_LINE_ITEMS" });
//     } catch (error) {
//       console.log("error with DELETE saga request", error);
//     }
//   }
