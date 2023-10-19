const archivedCustomerReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ARCHIVED_CUSTOMERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default archivedCustomerReducer;
  