import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import Router from './Router';
// import SyncStorage from 'sync-storage';

import Store from './Store'


type Props = {}

const App = (props: Props) => {
  
  return (
    <Provider store={Store}>
      <Router/>
    </Provider>
  )
}

export default App