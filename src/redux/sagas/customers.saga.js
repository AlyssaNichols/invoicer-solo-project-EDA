import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchCustomersSaga() {
    try {
      const response = yield axios.get("/api/customers");
      console.log("FETCH request customersSaga");
      yield put({ type: "SET_CUSTOMERS", payload: response.data });
    } catch {
      console.log("error in fetchCustomersSaga");
    }
  }

  function* addCustomerSaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/customers", action.payload );
      yield put({ type: "FETCH_CUSTOMERS" });
    } catch (error) {
      console.log("error in addCustomerSaga", error);
    }
  }

  function* deleteCustomerSaga(action) {
    try {
      yield axios.delete(`/api/customers/${action.payload}`);
      yield put({ type: "FETCH_CUSTOMERS" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }


  export default function* customersSaga() {
    yield takeEvery("FETCH_CUSTOMERS", fetchCustomersSaga);
    yield takeEvery("ADD_CUSTOMER", addCustomerSaga);
    yield takeEvery("DELETE_CUSTOMER", deleteCustomerSaga);
  }

