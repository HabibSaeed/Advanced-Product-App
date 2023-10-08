import React, { useState } from 'react';

const Button = (props) => {
    const { color, name } = props;
    const [hovered, setHovered] = useState(false);

    const buttonStyle = {
        backgroundColor: hovered ? '#cb8e72' : color || 'blue',
        color: 'white',
        padding: '10px 20px',
        margin:'10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.4s',
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {name || 'Button'}
        </button>
    );
}

export default Button;
