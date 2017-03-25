import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import './../common/polyfill';
import {polyfill} from 'es6-promise';
import {reducer} from './../reducers/reducers';
//components
import {Loader} from './Loader';
import {VisibleHeader} from './Header';
import {VisibleLogin} from './Login';
import {VisibleSearch} from './Search';
import {
  changeUserData,
  changeSearchHistoryBulk
} from './../actions/actions';
import './../scss/main.scss'; 

polyfill();

const store = createStore(reducer);


/**
 * Components
 */

const App = React.createClass({
  componentDidMount(){
    let userData = localStorage.getItem('userData') || '';
    const {dispatch} = store;
    if(userData){
      userData = JSON.parse(userData);
      dispatch(changeUserData(userData));
    }
    let searchHistory = localStorage.getItem('searchHistory') || '';
    if(searchHistory){
      searchHistory = JSON.parse(searchHistory);
      dispatch(changeSearchHistoryBulk(searchHistory));
    }
  },
  render:()=>{
    return <div>
      <VisibleHomePage />
    </div>;
  }
});

const HomePage = ({userData}) =>{
  return <div className="container">
          <VisibleHeader />
          {userData?<VisibleSearch />:<VisibleLogin />}
        </div>;
};



/**
 * Visible Home Component
 */

const VisibleHomePage = connect(({userData})=>{
  return{
    userData
  };
})(HomePage);


window.store = store;

window.onpopstate = () => {
    /** Use proper dispatches to move across states
     *
     **/
};

window.debounce = (func, wait = 600, immediate) => {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};


/** History management **/
const pushState = (value) => {
  if (window.history && window.history.state!=value)
  {
    window.history.pushState({'state': value}, '');
  }
};

let ajaxCache = {};

window.ajax = (method='GET', url, data)=>{
    return new Promise((resolve, reject)=>{
        if(ajaxCache[url]){
          resolve(ajaxCache[url]);
          return;
        }
        const client = new XMLHttpRequest();
        client.open(method, url, true);
        if (method == 'POST')
        {
            client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        client.onload = ()=>{
            if (client.status >= 200 && client.status < 400)
            {
              ajaxCache[url] = JSON.parse(client.responseText);
              resolve(JSON.parse(client.responseText));
            }
            else
            {
                reject(`Error with status ${client.status}`);
            }
        };
        client.onerror = ()=>{
            reject();
        };
        client.send(data);
    });
};

window.onbeforeunload = ()=>{
  const {search} = store.getState();
  let dNow = Date.now()-(1000*60*15);
  let searchHistory = _.filter(search.history, function(o) { 
    return o.timeStamp >= dNow; 
  });
  localStorage.setItem('searchHistory',JSON.stringify(searchHistory));
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('app'));


