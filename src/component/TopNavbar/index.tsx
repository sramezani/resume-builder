import React from 'react';
import { CirclePicker } from 'react-color';

import AppConfig from '../../constant/config';
import SelectFont from '../SelectFont';
import { appStore } from '../../redux/store';
import { updateTheme } from '../../redux/core/actions';

import styles from './topNavbar.module.scss';

import { IProps, IState } from "./topNavbar";

class TopNavbar extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            colorPicker: false,
            bgComplete: false,
            background: ''
        }

    }

    handleChangeComplete = (color: { hex: string}) => {
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
                    <div className={styles.bgComplete} onClick={this._bgPress} />
            }
            <div className={styles.TopNavbar}>
    
                <div className={styles.tonNavbarFelx1} onClick={this._colorBtnPress}>
                    <div className={styles.tonNavbarBorderRight + ' ' + styles.tonNavbarColor}>
                        <div className={styles.xxsxsxs}>

                        </div>
                        color
                    </div>
                </div>

                <div className={styles.tonNavbarFelx2}>
                    <div className={styles.tonNavbarBorderRight + ' ' + styles.topNavbarTypography}>
                        <div>
                            <SelectFont />
                        </div>
                        typography
                    </div>
                </div>

                <div className={styles.tonNavbarFelx1}>
                    <div className={styles.tonNavbarBorderRight + ' ' + styles.topNavbarSection}>
                        xxx
                    </div>
                </div>

                <div className={styles.tonNavbarFelx1}>
                    <div className={styles.tonNavbarBorderRight + ' ' + styles.topNavbarSave}>
                        xxx
                    </div>
                </div>

                <div className={styles.tonNavbarFelx1}>
                    <div className={styles.tonNavbarBorderRight + ' ' + styles.topNavbarLoad}>
                        xxx
                    </div>
                </div>

                <div className={styles.tonNavbarFelx1}>
                    <div className={styles.tonNavbarBorderRight + ' ' + styles.topNavbarDownlaod}>
                        xxx
                    </div>
                </div>

                <div className={styles.tonNavbarFelx1}>
                    <div className={styles.topNavbarPreview}>
                        xxx
                    </div>
                </div>

                {
                    colorPicker &&
                        <div className={styles.topNavbarCirclePicker}>
                        <CirclePicker
                            color={ this.state.background }
                            width={'134'}
                            colors={AppConfig.materialColors}
                            onChangeComplete={ this.handleChangeComplete }
                        />
                        </div>
                }
            </div>
            </>
        )
     }
}

/* Export Component =============================== */
export default TopNavbar;