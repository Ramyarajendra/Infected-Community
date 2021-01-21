import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Routes from '../utils/routing';
import { GlobalStyle } from '../config/theme';
import { UI__SetTheme } from '../redux/actions/ui'
export const Index = () => {
  const themeSelection = useSelector(state => state.uiReducer.useLightMode)
  const dispatch = useDispatch();
  return (
    <>
      <GlobalStyle themeSelection={themeSelection}/>
      <button className="ThemeButton" onClick={() => dispatch(UI__SetTheme())}>
        {themeSelection ? 'Light' : 'Dark'}
      </button>
      <Routes />
    </>
  )
}

export default Index;