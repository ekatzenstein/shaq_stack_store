import React from 'react';
const Subheader = (props) => {
    return (
        <div style={{
            fontFamily: 'pacfont',
            fontSize: '26px'
        }}>
            <br/> {props.children}
            <hr/>
            <br/>
        </div>
    )
}
export default Subheader;
