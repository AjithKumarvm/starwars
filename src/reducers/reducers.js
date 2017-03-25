const defaultState = {
  currentState: 'initial',
  currentDialogue: null,
  loader: {
    main:true,
    auth:false
  },
  isFetchable:{
    
  },
  userName:{
    value:null,
    error:null
  },
  password:{
    value:null,
    error:null
  },
  remember:{
    value:true
  },
  saveFlag:false,
  authError:null,
  search:{
    keyword:null,
    results:[],
    isFetching:false,
    history:[],
    error:null,
    quota:0
  },
  userData:null,
  preferences:null
};
//reducer
const reducer = (state=defaultState, action)=>{
  switch(action.type){
      case 'CHANGE_SAVED_STATE':{
          return {
              ...action.state
          };
      }
      case 'CHANGE_CURRENT_DIALOG':{
        const {value} = action;
        return {
          ...state,
          currentDialogue: value
        };
      }
      case 'CHANGE_CURRENT_STATE':{
        const {currentState} = action;
        return {
          ...state,
          currentState
        };
      }
      case 'CHANGE_FETCH_LOADER':{
        return {
          ...state,
          loader: {
            ...state.loader,
            fetchMore:action.value
          }
        }
      }
      case 'CHANGE_MAIN_LOADER':{
        return {
          ...state,
          loader: {
            ...state.loader,
            main:action.value
          }
        }
      }
      case 'CHANGE_AUTH_LOADER':{
        return {
          ...state,
          loader: {
            ...state.loader,
            auth:action.value
          }
        }
      }
      case "CHANGE_USERNAME_VALUE":{
        const {value} = action;
        return {
          ...state,
          userName: {...state.userName,value,error:null}
        };
      }
      case "CHANGE_USERNAME_ERROR":{
        const {error} = action;
        return {
          ...state,
          userName: {...state.userName,error}
        };
      }
      case "CHANGE_PASSWORD_VALUE":{
        const {value} = action;
        return {
          ...state,
          password: {...state.password,value,error:null}
        };
      }
      case "CHANGE_PASSWORD_ERROR":{
        const {error} = action;
        return {
          ...state,
          password: {...state.password,error}
        };
      }
      case "CHANGE_REMEMBER_VALUE":{
        const {value} = action;
        return {
          ...state,
          remember: {...state.remember,value,error:null}
        };
      }
      case "CHANGE_SEARCH_TEXT":{
        const {value} = action;
        return {
          ...state,
          search: {
            ...state.search,
            keyword:value,
            results:[],
            isFetching:true,
            error:false
          }
        };
      }
      case "CHANGE_SEARCH_RESULT":{
        const {list} = action;
        return {
          ...state,
          search: {
            ...state.search,
            results:list,
            isFetching:false
          }
        };
      }
      case "CHANGE_SEARCH_HISTORY":{
        const {entry} = action;
        return {
          ...state,
          search: {
            ...state.search,
            history:[entry,...state.search.history]
          }
        };
      }
      case "CHANGE_SEARCH_HISTORY_BULK":{
        const {list} = action;
        return {
          ...state,
          search: {
            ...state.search,
            history:list
          }
        };
      }
      case "CHANGE_SEARCH_NETWORK_ERROR":{
        const {error} = action;
        return {
          ...state,
          search: {
            ...state.search,
            error
          }
        };
      }
      case "CHANGE_SAVE_FLAG":{
        const {value} = action;
        return {
          ...state,
          saveFlag:value
        };
      }
      case "CHANGE_USER_DATA":{
        const {data} = action;
        return {
          ...state,
          userData:data
        };
      }
      case "CHANGE_USER_PREF":{
        const {data} = action;
        return {
          ...state,
          preferences:data
        };
      }
      case 'CHANGE_AUTH_ERROR':{
        const {message} = action;
        return {
          ...state,
          authError:message
        };
      }
      case 'CHANGE_SEARCH_QUOTA':{
        const {value} = action;
        return {
          ...state,
          search:{
            ...state.search,
            quota:value
          }
        }
      }
      default:
        return state;
  }
};

export {reducer};