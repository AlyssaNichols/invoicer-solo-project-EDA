const invoiceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INVOICES':
        return action.payload;
        // case 'UPDATE_DATE_PAID':
        //   const { id, date_paid } = action.payload;
        //   // Find the index of the invoice with the matching ID
        //   const index = state.findIndex((invoice) => invoice.id === id);
        //   if (index === -1) {
        //     return state; // If the invoice with the provided ID is not found, return the current state.
        //   }
        //   // Update the date_paid for the found invoice
        //   const updatedInvoice = { ...state[index], date_paid };
        //   // Create a new state array with the updated invoice
        //   const updatedState = [...state.slice(0, index), updatedInvoice, ...state.slice(index + 1)];
        //   return updatedState;
        default:
          return state;
      }
    };
    
    export default invoiceReducer;
   
  