import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchCustomersSaga() {
    try {
      const response = yield axios.get("/api/archived");
      console.log("FETCH request customersSaga");
      yield put({ type: "SET_ARCHIVED_CUSTOMERS", payload: response.data });
    } catch {
      console.log("error in fetchCustomersSaga");
    }
  }


  function* deleteCustomerSaga(action) {
    try {
      yield axios.delete(`/api/archived//${action.payload}`);
      yield put({ type: "FETCH_ARCHIVED_CUSTOMERS" });
      yield put({ type: "FETCH_CUSTOMERS" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }


  export default function* archivedCustomersSaga() {
    yield takeEvery("FETCH_ARCHIVED_CUSTOMERS", fetchCustomersSaga);
    yield takeEvery("RESET_CUSTOMER", deleteCustomerSaga);
  }

