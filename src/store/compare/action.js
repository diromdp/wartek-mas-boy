export const COMPARE_DATA = 'COMPARE_DATA';

export const getDataCompare = (stateData) => (dispatch) => {
  return dispatch({
    type: COMPARE_DATA,
    data: stateData,
  });
};
