function reducer(state = {}, action) {
  switch (action.type) {
    case 'increase':
      console.log('reducer：执行加法');
      return { ...state, count: state.count + 1 };
    case 'subtract':
      console.log('reducer：执行减法');
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

export { reducer };
