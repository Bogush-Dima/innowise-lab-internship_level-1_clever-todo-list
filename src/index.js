import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { App } from 'components/App/App';
import { ENTER_USER, GET_DB } from 'utils/constants';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, db: null, todos: [] };
  }

  dispatch = (action, payload = null) => {
    switch (action) {
      case 'click': {
        this.setState({ todos: [...payload] });
        break;
      }
      case ENTER_USER: {
        this.setState({ user: { ...payload } });
        break;
      }
      case GET_DB: {
        this.setState({ db: payload });
        break;
      }
      default:
        break;
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
