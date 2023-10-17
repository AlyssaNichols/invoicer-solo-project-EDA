import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchInvoiceHistorySaga() {
    try {
      const response = yield axios.get("/api/invoiceHistory");
      console.log("FETCH request invoicesSaga");
      yield put({ type: "SET_INVOICES", payload: response.data });
    } catch {
      console.log("error in fetch invoices");
    }
  }

  // function* addInvoiceSaga(action) {
  //   try {
  //     console.log(action.payload);
  //     yield axios.post("/api/invoice", action.payload );
  //     yield put({ type: "FETCH_INVOICES" });
  //   } catch (error) {
  //     console.log("error in add invoice", error);
  //   }
  // }


  function* editInvoiceSaga(action) {
    try {
      // action.payload should be the whole movie: { id, title, description, poster }
      yield axios.put(`/api/invoiceHistory`, action.payload);
      yield put({ type: "FETCH_INVOICES" });
    } catch (err) {
      console.log("Error in editing movie", err);
    }
  }
  function* deleteInvoiceSaga(action) {
    try {
      yield axios.delete(`/api/invoiceHistory/${action.payload}`);
      yield put({ type: "FETCH_INVOICES" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }

  export default function* invoiceSaga() {
    yield takeEvery("FETCH_INVOICES", fetchInvoiceHistorySaga);
    // yield takeEvery("ADD_INVOICE", addInvoiceSaga);
    yield takeEvery("EDIT_INVOICE", editInvoiceSaga)
    yield takeEvery ("DELETE_INVOICE", deleteInvoiceSaga)
  }