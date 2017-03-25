import React from 'react';
const Loader = ({show=false,message=null}) => {
  return show?<div style={{width:'100%',margin:'auto',marginTop:100,textAlign:'center'}}>
      <div>
        <div className="mainLoader" style={{margin:'auto',marginTop:10,marginBottom:10,display:'inherit'}} />
      </div>
      {message?<br />:null}
      {message}
    </div>:<div></div>;
};

export {Loader};