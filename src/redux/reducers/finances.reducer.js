const financesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FINANCES':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default financesReducer;
  