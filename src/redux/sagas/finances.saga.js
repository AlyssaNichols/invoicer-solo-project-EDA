import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchFinances() {
    try {
      const response = yield axios.get("/api/finances");
      console.log("FETCH request customersSaga");
      yield put({ type: "SET_FINANCES", payload: response.data });
    } catch {
      console.log("error in fetchCustomersSaga");
    }
  }


  export default function* financesSaga() {
    yield takeEvery("FETCH_FINANCES", fetchFinances);
  }

