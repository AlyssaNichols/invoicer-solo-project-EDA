const archivedHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ARCHIVED_INVOICES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default archivedHistoryReducer;
  