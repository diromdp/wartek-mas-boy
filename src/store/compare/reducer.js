export const COMPARE_DATA = 'COMPARE_DATA';

const initialState = {
  compare: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COMPARE_DATA:
      return { ...state, compare: action.data };
    default:
      return state;
  }
}
