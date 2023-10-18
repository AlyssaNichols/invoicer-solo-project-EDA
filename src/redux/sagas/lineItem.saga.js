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


export default function* lineItemSaga() {
    yield takeEvery("FETCH_LINE_ITEMS", fetchLineItemsSaga);
  }