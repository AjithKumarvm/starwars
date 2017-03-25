import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {changeLoader} from './../actions/actions';
import {FloatingInput,FloatingCheckBox} from './Fields';

const Search = () =>{
  return <div className="card searchCard">
          	<div className="group">
          		<VisibleSearchField labelName="Search for planets" required />
          	</div>
        </div>;
};

const VisibleSearchField = connect(({currentState})=>{
	return {
		currentState
	};
})(FloatingInput);

const VisibleSearch = connect(({currentState})=>{
  return{
    currentState
  };
},(dispatch)=>{
	return{
		hideLoader:()=>{
			dispatch(changeLoader('MAIN',false));
		}
	}
})(Search);

export {VisibleSearch};

