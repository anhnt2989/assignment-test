import React from 'react';
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import HomePage from 'containers/HomePage'

const AppWrapper = styled.div``

function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </AppWrapper>
  );
}

export default App;
