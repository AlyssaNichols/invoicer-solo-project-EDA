import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchInvoiceDetails(action) {
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
      const response = yield axios.post("/api/invoice/", action.payload.newInvoice );
      console.log("RESPONSE IS", response);
      yield put({ type: "FETCH_INVOICES" });
      history.push(`/invoice/details/${response.data.invoiceId}`);
    } catch (error) {
      console.log("error in add invoice", error);
    }
  }

  function* addLineItemSaga(action) {
    console.log("am i even running idiot")
    try {
      console.log("ACTION.PAYLOAD", action.payload);
      yield axios.post(`/api/lineItems/${action.payload.invoice_id}`, action.payload.newLineItem );
      yield put({ type: "FETCH_INVOICE_DETAILS", payload: action.payload.invoice_id });
    } catch (error) {
      console.log("error in add lineItem", error);
    }
  }

  function* deleteLineItemSaga(action) {
    try {
      yield axios.delete(`/api/lineItems/${action.payload.itemId}`);
      yield put({ type: "FETCH_INVOICE_DETAILS", payload: action.payload.invoice_id });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }

  function* editLineItem(action) {
    try {
      console.log("ACTION>PAYLOAD IS", action.payload)
      const response = yield axios.put(`/api/lineItems/${action.payload.invoice_id}`, {
        itemId: action.payload.itemId,
        date_performed: action.payload.date_performed,
        service_price: action.payload.service_price,
      });
      console.log("RESPONSE IS", response);
      yield put({ type: "FETCH_INVOICE_DETAILS", payload: action.payload.invoice_id });
    } catch (error) {
      console.log("error in edit invoice", error);
    }
  }
  


  export default function* invoiceDetails() {
    yield takeEvery("FETCH_INVOICE_DETAILS", fetchInvoiceDetails);
    yield takeEvery("ADD_INVOICE", addInvoiceSaga);
    yield takeEvery("ADD_LINE_ITEM", addLineItemSaga);
    yield takeEvery("DELETE_LINE_ITEM", deleteLineItemSaga);
    yield takeEvery("EDIT_LINE_ITEM", editLineItem);
  }