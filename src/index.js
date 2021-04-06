import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { fireDB } from 'utils/database';
import { App } from 'components/App/App';
import { history } from 'utils/history';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, db: fireDB, todos: [], path: history.location.pathname };
  }

  dispatch = (action, payload = null) => {
    switch (action) {
      case 'click': {
        this.setState({ todos: [...payload] });
        break;
      }
      case 'enter': {
        this.setState({ user: payload });
        break;
      }
      case 'newPath': {
        this.setState({ path: history.location.pathname });
        break;
      }
      default:
        break;
    }
  };

  render() {
    const { user, db, todos, path } = this.state;
    const value = {
      user,
      db,
      todos,
      path,
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
    <BrowserRouter history={history}>
      <Main />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
