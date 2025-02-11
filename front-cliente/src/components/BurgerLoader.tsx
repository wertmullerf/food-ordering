import React from 'react';
import './BurgerLoader.css';

const BurgerLoader: React.FC = () => {
    return (
        <div className="burger-loader">
            <div className="bun-top">
                <div className="seeds"></div>
            </div>
            <div className="cheese"></div>
            <div className="patty"></div>
            <div className="bun-bottom"></div>
        </div>
    );
};

export default BurgerLoader; 