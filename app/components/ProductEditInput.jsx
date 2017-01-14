import React from 'react';

function updateProperty(props,val,index){
  let arrayValue = props.value;
  if(Array.isArray(props.value)){
    arrayValue[index]=val
  }
  const updatedValue = Array.isArray(props.value) ? arrayValue : val;
  props.valueUpdate(props.keyValue,updatedValue)
}

const lineEditItem=(props)=>{
  return(
    <div>
    {
      Array.isArray(props.value)
        ?
        props.value.map((item,i)=>{
          return (
          <input className="form-control" key={i} value={item} onChange={(event)=>updateProperty(props,event.target.value,i)}/>
          )}
        )
        :
        <input className="form-control" value={props.value} onChange={(event)=>{updateProperty(props,event.target.value)}}/>
    }
    </div>
  )
}

export default lineEditItem;
