import React from 'react';
import ProductEditInput from './ProductEditInput';

const ProductEditTable = (props)=> (
  <div className="well">
    <form className="form-horizontal">
      <fieldset>
        <legend>Edit Product</legend>
        {
          ["title","category","current_price","description","photo_url","inventory","availability"].map((k,i)=>{
            const p = props.component;
            const frontEndTitles = ["Name","Categories","Current Price","Description","Photo URL","Inventory","Availability"]
            return (
              <div className="form-group" key={i}>
                <label className="col-xs-2 control-label">{frontEndTitles[i]}</label>
                <div className="col-xs-10">
                  {
                    <ProductEditInput value={p[k]} keyValue={k} valueUpdate={props.valueUpdate}></ProductEditInput>
                  }
                </div>
              </div>
            )
          })
        }
      </fieldset>
    </form>
  </div>
);

export default ProductEditTable;
