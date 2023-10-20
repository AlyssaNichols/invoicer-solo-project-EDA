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



  export default function* companiesSaga() {
    yield takeEvery("FETCH_COMPANIES", fetchCompanies);
;
  }

