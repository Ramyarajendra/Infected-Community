import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from '../screens/home/home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact={true}/>
    </BrowserRouter>
  )
}

export default Routes;