import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {changeUserData} from './../actions/actions';

const Header = ({userData,logOut}) =>{
  return <header>
  			<div className="userData">
  			{userData?
  				<div className="userName">
  					<small>Welcome</small> {userData.name} 
  					<button className="button-reset logout_button" onClick={logOut}>LOGOUT</button>
  				</div>:<div>STAR WARS LOGIN</div>}
  			</div>
          
        </header>;
};

const VisibleHeader = connect(({userData})=>{
  return{
    userData
  };
},(dispatch)=>{
	return{
		logOut:()=>{
			dispatch(changeUserData(null));
			localStorage.removeItem('userData');
		}
	}
})(Header);

export {VisibleHeader};