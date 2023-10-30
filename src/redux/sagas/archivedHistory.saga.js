import axios from "axios";
import { takeEvery, put } from "redux-saga/effects";

function* fetchArchivedHistory() {
    try {
      const response = yield axios.get("/api/archivedInvoices");
      console.log("FETCH request customersSaga");
      yield put({ type: "SET_ARCHIVED_INVOICES", payload: response.data });
    } catch {
      console.log("error in fetcharchivedhistory");
    }
  }


//   function* deleteArchivedInvoiceSaga(action) {
//     try {
//       yield axios.delete(`/api/archived//${action.payload}`);
//       yield put({ type: "FETCH_ARCHIVED_CUSTOMERS" });
//       yield put({ type: "FETCH_CUSTOMERS" });
//     } catch (error) {
//       console.log("error with DELETE saga request", error);
//     }
//   }


  export default function* archivedHistorySaga() {
    yield takeEvery("FETCH_ARCHIVED_INVOICES", fetchArchivedHistory);
    // yield takeEvery("RESET_INVOICE", deleteArchivedInvoiceSaga);
  }

