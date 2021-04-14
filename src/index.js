import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Context } from 'utils/context';
import { App } from 'components/App/App';
import { CLICK_DAY, ENTER_USER, GET_DB, RESET_DATA, TOGGLE_CREATE_TODO } from 'utils/constants';
import { fireAuth, fireDB } from 'utils/database';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      db: null,
      todos: [],
      checkedDay: '',
      createTodo: false,
      userLoaded: false,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentDidMount() {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        const addKeyToTodoObj = (obj) => {
          const keys = Object.keys(obj);
          const res = keys.map((key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key].key = key;
            return obj[key];
          });
          return res;
        };

        fireDB.ref(`/${user.email.replace('.', '_')}`).on('value', (snapShot) => {
          let result = {};
          snapShot.forEach((el) => {
            const { key } = el;
            const value = el.val();
            result = { ...result, [key]: addKeyToTodoObj(value) };
          });
          this.setState({ db: result });
        });
      }
      this.setState({
        user,
        userLoaded: true,
      });
    });
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
    const { user, db, todos, checkedDay, createTodo, userLoaded } = this.state;
    const value = {
      user,
      db,
      todos,
      checkedDay,
      createTodo,
      userLoaded,
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
