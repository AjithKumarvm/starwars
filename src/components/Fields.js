import React from 'react';
const FloatingInput = ({labelName, value, onChange , onFocus, onBlur, type = "text", error, debounce, hidden = false, index, id,symbol,maxLength, max,capitalize})=>{
    let node = null;
    let inputSymbol = '';
    if(capitalize){
      capitalize = {textTransform:'capitalize'};
    }
    if(symbol && symbol=='rupee'){
      inputSymbol = <div style={{width:20,position:'absolute',top:1}}><SVGRupeeIcon style={{verticalAlign:'middle'}} /></div>;
    }
    let maxLengthProp = {};
    if(maxLength && type!='number'){
      maxLengthProp = {
        maxLength:maxLength
      }
    }
    let extraProps = {};
    if(type == 'number'){
      extraProps = {
        min:0,
        max:max || 9999999,
        step:1,
        onKeyUp: (e)=>{
          if(type=='number' && e.target.validity){
            if(!e.target.validity.valid){
              e.target.value = '';
            }
          }
        }
      };
    }
    return  ((!hidden)?<div className="group">
                {inputSymbol}
                <input className={error ? "inputMaterial invalid" : "inputMaterial"}
                  style={symbol?{paddingLeft:20,...capitalize}:{...capitalize}}
                  ref={(c)=>{node=c;}}
                  onChange={debounce?window.debounce(()=>{
                    if(node)
                      {
                        onChange(node.value, index);
                      }
                    }):()=>{
                    if(node) {onChange(node.value, index);}
                    }
                  }
                  onBlur={onBlur}
                  onFocus={onFocus}
                  type={type}
                  {...extraProps}
                  {...maxLengthProp}
                  defaultValue={value}
                  id={id}
                  required
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off" />
                <span className={error ? "highlight invalid" : "highlight"}></span>
                <span className={error ? "bar invalid" :"bar"}></span>
                <label style={symbol?{paddingLeft:20}:{}} className={error ? "invalid" : "normal"}>{labelName}</label>
                {error ? <span className="error">{error} </span> : null}
            </div>:<div></div>);
};

const FloatingCheckBox = ({labelName, defaultValue, onChange , style})=>{
    return  (<div className="group">
                {
                  (defaultValue)?
                    <div className="row press" onClick={()=>{onChange(false);}}>
                      <input type="checkbox" id="checked" className="cbx hidden" onChange={()=>{}} checked={defaultValue} />
                      <label htmlFor="checked" className="lbl"></label>
                    </div>
                  :
                    <div className="row press" onClick={()=>{onChange(true);}}>
                      <input type="checkbox" id="unchecked" className="cbx hidden" onChange={()=>{}} checked={defaultValue} />
                      <label htmlFor="unchecked" className="lbl"></label>
                    </div>
                }
                {labelName}
            </div>);
};

export {FloatingInput,FloatingCheckBox};