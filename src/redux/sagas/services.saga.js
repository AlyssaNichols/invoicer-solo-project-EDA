import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchServicesSaga() {
    try {
      const response = yield axios.get("/api/services");
      console.log("FETCH request servicesSaga");
      yield put({ type: "SET_SERVICES", payload: response.data });
    } catch {
      console.log("error in fetchServicesSaga");
    }
  }

  function* addServiceSaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/services", action.payload);
      yield put({ type: "FETCH_SERVICES" });
    } catch (error) {
      console.log("error in addServiceSaga", error);
    }
  }

  function* deleteServiceSaga(action) {
    try {
      yield axios.delete(`/api/services/${action.payload}`);
      yield put({ type: "FETCH_SERVICES" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }


  export default function* servicesSaga() {
    yield takeEvery("FETCH_SERVICES", fetchServicesSaga);
    yield takeEvery("ADD_SERVICE", addServiceSaga);
    yield takeEvery("DELETE_SERVICE", deleteServiceSaga);
  }