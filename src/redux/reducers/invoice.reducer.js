const invoiceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVOICES':
        return action.payload;
        default:
          return state;
      }
    };
    
    export default invoiceReducer;
   
  