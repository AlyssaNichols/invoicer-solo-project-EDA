const invoiceReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_INVOICE':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default invoiceReducer;