import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchLineItemsSaga() {
    try {
      const response = yield axios.get("/api/lineItems");
      console.log("FETCH request lineItems");
      yield put({ type: "SET_LINE_ITEMS", payload: response.data });
    } catch {
      console.log("error in fetch invoices");
    }
  }

  function* addLineItemSaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/lineItems", action.payload );
      yield put({ type: "FETCH_LINE_ITEMS" });
    } catch (error) {
      console.log("error in add invoice", error);
    }
  }

  function* deleteLineItemSaga(action) {
    try {
      yield axios.delete(`/api/lineItems/${action.payload}`);
      yield put({ type: "FETCH_LINE_ITEMS" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }
  

  export default function* lineItemsSaga() {
    yield takeEvery("FETCH_LINE_ITEMS", fetchLineItemsSaga);
    yield takeEvery("ADD_LINE_ITEM", addLineItemSaga);
    yield takeEvery("DELETE_LINE_ITEM", deleteLineItemSaga);

  }