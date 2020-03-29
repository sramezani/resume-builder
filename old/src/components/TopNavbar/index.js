import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker, ChromePicker, BlockPicker, PhotoshopPicker, TwitterPicker, CirclePicker } from 'react-color';

import Util from '../../lib/Util';
import AppConfig from '../../constants/config';

import SelectFont from '../SelectFont';

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
    
                <div className="tonNavbar-felx1" onClick={this._colorBtnPress}>
                    <div className="tonNavbar-border-right tonNavbar-color">
                        <div className="xxsxsxs">

                        </div>
                        color
                    </div>
                </div>

                <div className="tonNavbar-felx2">
                    <div className="tonNavbar-border-right topNavbar-typography">
                        <div>
                            <SelectFont />
                        </div>
                        typography
                    </div>
                </div>

                <div className="tonNavbar-felx1">
                    <div className="tonNavbar-border-right topNavbar-section">
                        xxx
                    </div>
                </div>

                <div className="tonNavbar-felx1">
                    <div className="tonNavbar-border-right topNavbar-save">
                        xxx
                    </div>
                </div>

                <div className="tonNavbar-felx1">
                    <div className="tonNavbar-border-right topNavbar-load">
                        xxx
                    </div>
                </div>

                <div className="tonNavbar-felx1">
                    <div className="tonNavbar-border-right topNavbar-downlaod">
                        xxx
                    </div>
                </div>

                <div className="tonNavbar-felx1">
                    <div className="topNavbar-preview">
                        xxx
                    </div>
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