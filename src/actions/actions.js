//actions
const changeSavedState = (state)=>{
  return {
      type: 'CHANGE_SAVED_STATE',
      state: state
  };
};
const changeCurrentState = (currentState) => {
  return {
    type: "CHANGE_CURRENT_STATE",
    currentState
  };
};
const changeCurrentDialogue = (value) => {
  return {
    type: "CHANGE_CURRENT_DIALOG",
    value
  };
};
const changeLoader = (type,value) => {
  return {
    type: "CHANGE_"+type+"_LOADER",
    value
  };
};
const changeFetchable = (type,value)=>{
  return {
    type: "CHANGE_"+type+"_FETCHABLE",
    value
  };
}
const changeFieldNameValue = (fieldName, value)=>{
  return {
    type: 'CHANGE_' + fieldName + '_VALUE',
    value
  };
};
const changeFieldNameError = (fieldName, error) => {
  return {
    type: 'CHANGE_' + fieldName + '_ERROR',
    error
  };
};
const changeSearchText = (value, error) => {
  return {
    type: 'CHANGE_SEARCH_TEXT',
    value
  };
};
const changeSearchResult = (list) => {
  return {
    type: 'CHANGE_SEARCH_RESULT',
    list
  };
};
const changeSaveFlag = (value) => {
  return {
    type: 'CHANGE_SAVE_FLAG',
    value
  };
};
const changeUserData = (data) => {
  return {
    type: 'CHANGE_USER_DATA',
    data
  };
};
const changeUserPref = (data) => {
  return {
    type: 'CHANGE_USER_PREF',
    data
  };
};
const changeAuthError = (message) => {
  return {
    type: 'CHANGE_AUTH_ERROR',
    message
  };
};

export {
  changeSavedState,
  changeCurrentState,
  changeCurrentDialogue,
  changeLoader,
  changeFetchable,
  changeFieldNameValue,
  changeFieldNameError,
  changeSearchText,
  changeSearchResult,
  changeSaveFlag,
  changeUserData,
  changeUserPref,
  changeAuthError
};

