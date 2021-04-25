import React from 'react';
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import HomePage from 'containers/HomePage'

import GlobalStyles from './global-styles'

const AppWrapper = styled.div``

function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <GlobalStyles />
    </AppWrapper>
  );
}

export default App;
