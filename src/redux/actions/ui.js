/**
 * @file ui.js
 * @description Dispatch UI actions here.
 */

 export const UIActions = {
  SET_ATTRIBUTE: 'UI_SET_ATTRIBUTE'
 }

 export const UI__SetTheme = () => (dispatch, getState) => {
  //  console.log(getState());
   const useLightMode = getState().uiReducer.useLightMode;
  //  console.log(useLightMode)
   dispatch({type: UIActions.SET_ATTRIBUTE, key: 'useLightMode', value: !useLightMode});
 }