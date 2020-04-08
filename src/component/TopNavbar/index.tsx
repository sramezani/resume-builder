import React from 'react';
import { CirclePicker } from 'react-color';

import download from 'downloadjs';

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

    _downloadPDFBtnPress = async () => {

        const res = await fetch('http://localhost:3007/download');
        const blob = await res.blob();
        download(blob, 'test.pdf');

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
    
                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')} onClick={this._colorBtnPress}>
                    <div className={[styles.topNavbarColor].join(' ')}>

                        <div className={[styles.topPart, styles.colorCircle].join(' ')}>

                        </div>
                        <div className={styles.bottomPart}>
                            Color
                        </div>
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx2].join(' ')}>
                    <div className={[styles.topNavbarTypography].join(' ')}>
                        <div className={styles.topPart}>
                            <SelectFont />
                        </div>
                        <div className={styles.bottomPart}>
                        Typography
                        </div>
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}>
                    <div className={styles.topNavbarSection}>
                        <div className={styles.topPart}>
                            <i className="material-icons">vertical_split</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Section
                        </div>
                        
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}>
                    <div className={styles.topNavbarSave}>
                        <div className={styles.topPart}>
                            <i className="material-icons">save</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Save
                        </div>
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}>
                    <div className={styles.topNavbarLoad}>
                        <div className={styles.topPart}>
                            <i className="material-icons">insert_drive_file</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Load
                        </div>
                        
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}>
                    <div className={styles.topNavbarPreview}>
                        <div className={styles.topPart}>
                            <i className="material-icons">visibility</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Preview
                        </div>
                        
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarFelx2].join(' ')} onClick={this._downloadPDFBtnPress}>
                    <div className={styles.topNavbarDownlaod}>
                        <div className={styles.topPart}>
                            <i className="material-icons">picture_as_pdf</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Download PDF
                        </div>
                        
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