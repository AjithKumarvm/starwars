import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
	changeFieldNameValue,
	changeFieldNameError,
	changeSaveFlag,
	changeUserData,
	changeLoader,
	changeAuthError
} from './../actions/actions';
import {FloatingInput,FloatingCheckBox} from './Fields';
import 'lodash';

const serverUrl = 'http://swapi.co/api/';

const saveAuth = (userData) => {
	const {remember} = store.getState();
	if(userData && remember.value){
		localStorage.setItem('userData',JSON.stringify(userData));
	}else{
		localStorage.removeItem('userData');
	}
};

const validateSaveFlag = () => {
	const {dispatch} = store;
	const {userName,password} = store.getState();
	if(userName.value && password.value){
		dispatch(changeSaveFlag(true));
		dispatch(changeAuthError(null));
	}else{
		dispatch(changeSaveFlag(false));
	}
};

const validateLogin = () =>{
	const {dispatch} = store;
	const {userName,password} = store.getState();
	if(!userName.value){
		dispatch(changeFieldNameError('USERNAME','Please enter username'));
	}
	if(!password.value){
		dispatch(changeFieldNameError('PASSWORD','Please enter password'));
	}
	validateSaveFlag();
	if(userName.value && password.value){
		dispatch(changeLoader('AUTH',true));
		ajax('GET', serverUrl+'people').then((resp) => {
			dispatch(changeLoader('AUTH',false));
	        if (resp && resp.count){
	          let authResult = _.find(resp.results, function(o) { 
	          	return o.name == userName.value && o.birth_year == password.value 
	          }) || null;
	          if(authResult){
	          	dispatch(changeUserData(authResult));
	          	dispatch(changeAuthError(null));
	          	saveAuth(authResult);
	          }else{
	          	dispatch(changeUserData(null));
	          	dispatch(changeAuthError('Invalid Credentials'));
	          	saveAuth(null);
	          }
	        }else{
	        	dispatch(changeUserData(false));
	          	dispatch(changeAuthError('Invalid Credentials'));
	          	saveAuth(null);
	        }
	      }).catch(()=>{
	      	dispatch(changeLoader('AUTH',false));
	        dispatch(changeAuthError('Network Error'));
	      });
	}
};

const Login = () =>{
  return <div className="card">
          	<div className="group">
          		<VisibleUsername labelName="Username" required />
          	</div>
          	<div className="group">
          		<VisiblePassword labelName="Password" type="password" required />
          	</div>
          	<div className="group">
          		<VisibleRemember labelName="Remember me" />
          	</div>
          	<div className="group">
          		<VisibleSaveButton />
          	</div>
        </div>;
};

const VisibleUsername = connect(({userName})=>{
	return {
		value:userName.value,
		error:userName.error
	};
},(dispatch)=>{
	return {
		onChange:(value)=>{
			dispatch(changeFieldNameValue('USERNAME',value));
			validateSaveFlag();
		}
	};
})(FloatingInput);

const VisiblePassword = connect(({password})=>{
	return {
		value:password.value,
		error:password.error
	};
},(dispatch)=>{
	return {
		onChange:(value)=>{
			dispatch(changeFieldNameValue('PASSWORD',value));
			validateSaveFlag();
		}
	};
})(FloatingInput);

const VisibleRemember = connect(({remember})=>{
	return {
		defaultValue:remember.value
	};
},(dispatch)=>{
	return {
		onChange:(value)=>{
			dispatch(changeFieldNameValue('REMEMBER',value));
			validateSaveFlag();
		}
	};
})(FloatingCheckBox);

const VisibleLogin = connect(({currentState})=>{
  return {
    currentState
  };
},(dispatch)=>{
	return {
		hideLoader:()=>{
			//dispatch(changeLoader('MAIN',false));
		}
	}
})(Login);

const SaveButton = ({saveFlag,onClick,authLoader,authError}) =>{
	let validateStyle = saveFlag?{color:'#fff',backgroundColor:'#27AE51'}:{color:'#cacaca',backgroundColor:'#9a9a9a'};
	return <div>
	{authError?<div className="authError">{authError}</div>:null}
	{
		authLoader?
		<div className="mainLoader"></div>
		:<button className="button-reset login_button" style={validateStyle} onClick={onClick}>LOGIN</button>
	}
	</div>;
};

const VisibleSaveButton = connect(({saveFlag,loader,authError})=>{
	return {
		saveFlag,
		authLoader:loader.auth,
		authError
	};
},(dispatch)=>{
	return {
		onClick:()=>{
			validateLogin();
		}
	}
})(SaveButton);

export {VisibleLogin};