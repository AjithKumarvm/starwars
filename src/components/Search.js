import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
	changeLoader,
	changeSearchText,
	changeSearchResult,
	changeSearchHistory,
	changeSearchNetworkError,
	changeSearchQuota
} from './../actions/actions';
import {FloatingInput,FloatingCheckBox} from './Fields';

const serverUrl = 'http://swapi.co/api/';
const searchApi = () =>{
	//doesnt trigger ajax on each key type. window.debouncer() waits 600ms
	//after each keystrokem, to avoid glitch and unwanted search query
	//the ajax results are cached for faster response
	const {dispatch} = store;
	const {search,userData} = store.getState();
	let blockSearch = false;
	let searchHitLimit = 15; 
	let searchTimeLimit = 1;
	let dNow = Date.now()-(1000*60*searchTimeLimit);
	let searchHistory = _.filter(search.history, function(o) { 
		return o.timeStamp >= dNow; 
	}); //filtering to get all searches made in last 1 minute.
	if(searchHistory && searchHistory.length){
		if(searchHistory.length>=searchHitLimit){
			blockSearch = true;
		}
		dispatch(changeSearchQuota(searchHitLimit-searchHistory.length));
	}else{
		dispatch(changeSearchQuota(searchHitLimit));
	}
	if(blockSearch){ //blocking search
		if(userData.name == 'Luke Skywalker'){ //excluding Luke
			dispatch(changeSearchNetworkError('Search quota exceeded, but your are Luke Skywalker. Force is with you.'));
		}else{
			dispatch(changeSearchText(null));
			dispatch(changeSearchNetworkError('Search quota of 15 hits per minute is exceeded'));
			return;	
		}
	}
	if(search.keyword){
		dispatch(changeLoader('SEARCH',true));
		dispatch(changeSearchHistory(search.keyword));
		ajax('GET', serverUrl+'planets/?search='+search.keyword).then((resp) => {
			dispatch(changeLoader('SEARCH',false));
	        if (resp && resp.count){
	          //converting population data to integer
	          resp.results = _.map(resp.results,(item)=>{
	          	if(isNaN(item.population)){
	          		item.population = 0;
	          	}else{
	          		item.population = +item.population;
	          	}
	          	return item;
	          });

	          //ordering but population
	          resp.results = _.orderBy(resp.results,['population'],['desc']);
	          dispatch(changeSearchResult([...resp.results]));
	        }else{
	        	dispatch(changeSearchResult([]));
	        }
	      }).catch(()=>{
	      	dispatch(changeSearchNetworkError('Network error. Please retry.'));
	      	dispatch(changeLoader('SEARCH',false));
	      });
	}
};

const ResultCard = ({item}) =>{
	return <div className="result_card">
		<div className="planet_name">{item.name}
		</div><div 
		className="planet_popl">{item.population}</div>
	</div>
}

const Search = ({search,userData}) =>{
  //changes color based on quota left
  let red = 0,green = 255;
  let perc = search.quota/15*100;
  green = perc*255/100;
  red = 255-green;
  let isLuke = userData.name == 'Luke Skywalker';
  return <div className="card searchCard">
          	<div className="group">
          		<VisibleSearchField labelName="Search for planets" required />
          	</div>
          	<div className="group">
          		{search.keyword?
          			search.results.length == 0 && !search.isFetching?
          				<div className="head_line">No Results found for {search.keyword}</div>
          				:search.isFetching?
          					<div className="head_line"><div className="mainLoader small"></div>Searching for {search.keyword}</div>:
          					<div className="head_line">Results for {search.keyword}</div>
          			:null
          		}
          	</div>
          	{search.quota>0?<div className="group"><div className="head_line search_error" style={{color:`rgb(${red},${green},0)`}}>Remaining Quota: {search.quota}</div></div>:null}
          	{search.error?<div className="group"><div className="head_line search_error" style={{color:isLuke?'green':'red'}}>{search.error}</div></div>:null}
          	<div className="search_result">
          		{search.results.length?<div className="result_headline">
          			<div className="planet_name">Name
					</div><div 
					className="planet_popl">Population</div>
          		</div>:null}
          		{
          			_.map(search.results,(item,i)=>{
          				return (<div key={i}>
          					<ResultCard item={item} />
          				</div>);
          			})
          		}
          	</div>
        </div>;
};

const VisibleSearchField = connect(()=>{
	return {
		debounce:true //this enables the debouncer.
	};
},(dispatch)=>{
	return {
		onChange: (value)=>{
			dispatch(changeSearchText(value));
			searchApi();
		}
	};
})(FloatingInput);

const VisibleSearch = connect(({search,userData})=>{
  return{
    search,
    userData
  };
},(dispatch)=>{
	return{
		hideLoader:()=>{
			dispatch(changeLoader('MAIN',false));
		}
	}
})(Search);

export {VisibleSearch};

