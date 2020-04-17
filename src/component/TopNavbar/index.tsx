import React from 'react';
import { CirclePicker } from 'react-color';
import Tippy from '@tippyjs/react';
import Switch from "react-switch";

import download from 'downloadjs';

import AppConfig from '../../constant/config';
import SelectFont from '../SelectFont';
import { appStore } from '../../redux/store';
import { updateTheme, updateItemStatus } from '../../redux/core/actions';

import styles from './topNavbar.module.scss';

import { IProps, IState } from "./topNavbar";

class TopNavbar extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            colorPicker: false,
            bgComplete: false,
            background: '',
            checked: false,
            sectionStatus: false
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

    _updateItemStatus = (name: string, status: boolean) => {
        const data = {
            [name]: status
        }
        appStore.dispatch(updateItemStatus(data));
    }

    _switchBtnClick = (name: string) => {
        const { itemStatus } = this.props;
        this._updateItemStatus(name, !itemStatus[name]);
    }

    _switchBtn = (name: string) => {
        const { itemStatus, theme } = this.props;
        return (
            <Switch
                onChange={() => this._updateItemStatus(name, !itemStatus[name])}
                checked={itemStatus[name]}
                uncheckedIcon={false}
                checkedIcon={false}
                activeBoxShadow="0px 0px 0px 0px #ffffff00"
                width={40}
                height={20}
                offColor="#aaa"
                onColor={theme.color}
            /> 
        )
    }

    _sectionBtnPress = () => {
        this.setState({
            bgComplete: !this.state.bgComplete,
            sectionStatus: !this.state.sectionStatus
        })
    }

    _setcionTippyContent = () => {
        return (
            <div className={styles.sectionBox}>
                <div className={styles.sectionLeft}>
                    <div className={styles.sectionItem}>
                        {this._switchBtn('picture')}
                        <span className={styles.sectionItemText} onClick={() => this._switchBtnClick('picture')}>
                            Picture
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {this._switchBtn('info')}
                        <span className={styles.sectionItemText} onClick={() => this._switchBtnClick('info')}>
                            Info
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {this._switchBtn('profile')}
                        <span className={styles.sectionItemText} onClick={() => this._switchBtnClick('profile')}>
                            Profile
                        </span>
                    </div>
                </div>
                <div className={styles.sectionRight}>
                    <div className={styles.sectionItem}>
                        {this._switchBtn('workExperience')}
                        <span className={styles.sectionItemText} onClick={() => this._switchBtnClick('workExperience')}>
                            WorkExperience
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {this._switchBtn('education')}
                        <span className={styles.sectionItemText} onClick={() => this._switchBtnClick('education')}>
                            Education
                        </span>
                    </div>
                    <div className={styles.sectionItem}>
                        {this._switchBtn('skills')}
                        <span className={styles.sectionItemText} onClick={() => this._switchBtnClick('skills')}>
                            Skills
                        </span>
                    </div>
                </div>
            </div>
        )
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
                
                <Tippy
                    visible={this.state.sectionStatus}
                    onClickOutside={() => this.setState({ sectionStatus: false })}
                    className="sectionTippy"
                    content={this._setcionTippyContent()}
                    interactive={true}
                    delay={200}
                    duration={[400, 200]}
                    maxWidth={600}
                    placement='bottom'
                    arrow
                >
                    <div
                        className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}
                        onClick={this._sectionBtnPress}
                    >
                        <div className={styles.topNavbarSection}>
                            <div className={styles.topPart}>
                                <i className="material-icons">vertical_split</i>
                            </div>
                            <div className={styles.bottomPart}>
                                Section
                            </div>
                            
                        </div>
                    </div>
                </Tippy>

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