import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker, ChromePicker, BlockPicker, PhotoshopPicker, TwitterPicker, CirclePicker } from 'react-color';

import Util from '../../lib/Util';
import AppConfig from '../../constants/config';

import { appStore } from '../../redux/store';
import { updateTheme } from '../../redux/core/actions';


import styles from './style.scss';

class TopNavbar extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
            colorPicker: false,
            bgComplete: false
        }

    }

    handleChangeComplete = (color) => {
        this._bgPress();
        this.setState({ background: color.hex });
        const data = {
            color: color.hex
        }
        appStore.dispatch(updateTheme(data));
    };

    _colorBtnPress = () => {
        // this._bgPress();
        this.setState({
            bgComplete: true,
            colorPicker: true
        })
    }

    _bgPress = () => {
        this.setState({
            colorPicker: false,
            bgComplete: false
        });
    }

    render(){
        let { colorPicker, bgComplete } = this.state;
        return (
            <>
            {
                bgComplete &&
                    <div className="bg-complete" onClick={this._bgPress} />
            }
            <div className="TopNavbar">
                <div className="tonNavbar-color-btn" onClick={this._colorBtnPress}>
                    color
                </div>
                {
                    colorPicker &&
                        <CirclePicker
                            color={ this.state.background }
                            width={134}
                            className="topNavbar-circle-picker"
                            colors={AppConfig.materialColors}
                            onChangeComplete={ this.handleChangeComplete }
                        />
                }
            </div>
            </>
        )
     }
}


TopNavbar.propTypes = {
};

TopNavbar.defaultProps = {
};

/* Export Component =============================== */
export default TopNavbar;