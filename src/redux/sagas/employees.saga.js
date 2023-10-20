import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchEmployeesSaga() {
    try {
      const response = yield axios.get("/api/employees");
      console.log("FETCH request customersSaga");
      yield put({ type: "SET_EMPLOYEES", payload: response.data });
    } catch {
      console.log("error in fetch employees saga");
    }
  }

  function* addEmployeeSaga(action) {
    try {
      console.log(action.payload);
      yield axios.post("/api/employees", action.payload );
      yield put({ type: "FETCH_EMPLOYEES" });
    } catch (error) {
      console.log("error in add employee saga", error);
    }
  }

  function* softDeleteEmployee(action) {
    try {
      yield axios.delete(`/api/employees//${action.payload}`);
      yield put({ type: "FETCH_EMPLOYEES" });
    } catch (error) {
      console.log("error with DELETE saga request", error);
    }
  }

  export default function* employeesSaga() {
    yield takeEvery("FETCH_EMPLOYEES", fetchEmployeesSaga);
    yield takeEvery("ADD_EMPLOYEE", addEmployeeSaga);
    yield takeEvery("DELETE_EMPLOYEE", softDeleteEmployee);
  }

