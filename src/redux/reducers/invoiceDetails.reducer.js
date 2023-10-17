
const invoiceDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case "SET_INVOICE_DETAILS":
        return action.payload;
      default:
        return state;
  }
  }

  export default invoiceDetailsReducer;