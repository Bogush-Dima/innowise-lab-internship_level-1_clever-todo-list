import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { fireAuth, fireDB } from 'utils/database';
import { App } from 'components/App/App';

const value = {
  user: fireAuth,
  db: fireDB,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={value}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
