import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

  function* fetchLineItemsSaga(action) {
    try {
      const response = yield axios.get(`/api/lineItems/${action.payload}`);
      console.log("FETCH request lineItems");
      yield put({ type: "SET_LINE_ITEMS", payload: response.data });
    } catch {
      console.log("error in fetch lineitems");
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

//   function* deleteLineItemSaga(action) {
//     try {
//       yield axios.delete(`/api/lineItems/${action.payload}`);
//       yield put({ type: "FETCH_LINE_ITEMS" });
//     } catch (error) {
//       console.log("error with DELETE saga request", error);
//     }
//   }


export default function* lineItemSaga() {
    yield takeEvery("FETCH_LINE_ITEMS", fetchLineItemsSaga);
    yield takeEvery("ADD_LINE_ITEM", addLineItemSaga);
    // yield takeEvery("DELETE_LINE_ITEM", deleteLineItemSaga);
  }