import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchCompanies() {
    try {
      const response = yield axios.get("/api/companies");
      console.log("FETCH request customersSaga");
      yield put({ type: "SET_COMPANIES", payload: response.data });
    } catch {
      console.log("error in fetchCustomersSaga");
    }
  }

  function* addCompanySaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/companies", action.payload);
      yield put({ type: "FETCH_COMPANIES" });
    } catch (error) {
      console.log("error in addCustomerSaga", error);
    }
  }

  function* deleteCompanySaga(action) {
    try {
      yield axios.delete(`/api/companies/${action.payload}`);
      yield put({ type: "FETCH_COMPANIES" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }


  export default function* companiesSaga() {
    yield takeEvery("FETCH_COMPANIES", fetchCompanies);
    yield takeEvery("ADD_COMPANY", addCompanySaga);
    yield takeEvery("DELETE_COMPANY", deleteCompanySaga);
;
  }

