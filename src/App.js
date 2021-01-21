import React from 'react';
import {Provider} from 'react-redux';
import { ThemeProvider } from 'styled-components/macro';
import Index from './screens/index';
import theme from './config/theme';

import createStore from './redux/configureStore';


const store = createStore();

const App = () => {
  return (
    <Provider store={store} >
      <ThemeProvider theme={theme}>
        <Index/>
      </ThemeProvider>
    </Provider>
  );
}


export default App;
