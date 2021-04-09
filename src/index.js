import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { App } from 'components/App/App';
import { CLICK_DAY, ENTER_USER, GET_DB, RESET_DATA, TOGGLE_CREATE_TODO } from 'utils/constants';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, db: null, todos: [], checkedDay: '', createTodo: false };
  }

  dispatch = (action, payload = null) => {
    switch (action) {
      case CLICK_DAY: {
        const { todos, key } = payload;
        this.setState({ todos: [...todos], checkedDay: key });
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
      case RESET_DATA: {
        this.setState({ user: payload, db: payload, todos: [], checkedDay: '' });
        break;
      }
      case TOGGLE_CREATE_TODO: {
        this.setState({ createTodo: payload });
        break;
      }
      default:
        break;
    }
  };

  render() {
    const { user, db, todos, checkedDay, createTodo } = this.state;
    const value = {
      user,
      db,
      todos,
      checkedDay,
      createTodo,
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
