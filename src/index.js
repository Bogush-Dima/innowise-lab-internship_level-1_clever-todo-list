import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { changeUserEmail } from 'utils/actions';
import { App } from 'components/App/App';
import { CLICK_DAY, ENTER_USER, GET_DB, RESET_DATA, TOGGLE_CREATE_TODO } from 'utils/constants';
import { fireAuth, fireDB } from 'utils/database';

class Main extends Component {
  state = {
    user: false,
    db: null,
    todos: [],
    checkedDay: '',
    createTodo: false,
    userLoaded: false,
  };

  componentDidMount() {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.getDB(user);
      }
      this.setState({
        user,
        userLoaded: true,
      });
    });
  }

  addKeyToTodoObj = (obj) => {
    const keys = Object.keys(obj);
    const res = keys.map((key) => {
      obj[key].key = key;
      return obj[key];
    });
    return res;
  };

  getDB = (user) => {
    fireDB.ref(`/${changeUserEmail(user)}`).on('value', (snapShot) => {
      let result = {};
      snapShot.forEach((el) => {
        const { key } = el;
        const value = el.val();
        result = { ...result, [key]: this.addKeyToTodoObj(value) };
      });
      this.setState({ db: result });
    });
  };

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
    return (
      <Context.Provider value={{ ...this.state, dispatch: this.dispatch }}>
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
