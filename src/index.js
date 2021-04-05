import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { fireAuth, fireDB } from 'utils/database';
import { App } from 'components/App/App';

class Main extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-state
    this.state = { user: fireAuth, db: fireDB, todos: [] };
  }

  dispatch = (action, payload = null) => {
    switch (action) {
      case 'click': {
        // eslint-disable-next-line react/no-unused-state
        return this.setState({ todos: [...payload] });
      }
      default:
        return null;
    }
  };

  render() {
    const { user, db, todos } = this.state;
    const value = {
      user,
      db,
      todos,
      dispatch: this.dispatch,
    };

    return (
      <Context.Provider value={value}>
        <App />
      </Context.Provider>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
