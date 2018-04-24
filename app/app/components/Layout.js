import React, {Component} from 'react';
import Slider from './Slider';

const Layout = ({children}) => {
    return (
        <div className="view-container">
            <div className="container">
                <Slider />
            </div>
        </div>
    )
}

export default Layout;
