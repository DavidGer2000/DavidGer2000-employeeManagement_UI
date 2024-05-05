import React from 'react'

const MyButton = (props) => {
    const isActive = (props.number === props.activeButton);
    return (
        <button onClick={() =>
            props.onEach(props.number)} className={`btn ${isActive ? 'btn-primary' : 'btn-light'} border m-2`} >
            {props.number}
        </button>
    );
};
export default MyButton;