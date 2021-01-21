/**
 * @file reducers/ui.js
 */
import produce from 'immer';
import {UIActions} from '../actions/ui'
const initialState = {
  useLightMode: true
}

const UIReducer = produce((state = initialState, action) => {
  switch(action.type){
    case UIActions.SET_ATTRIBUTE:
      state[action.key] = action.value;
      break;
    default:
  }
  return state;
})

export default UIReducer;