import React from 'react';
// import { CirclePicker } from 'react-color';
import Tippy from '@tippyjs/react';
import Switch from "react-switch";

import download from 'downloadjs';

import AppConfig from '../../constant/config';
import { appStore } from '../../redux/store';
import { updateTheme, updateItemStatus } from '../../redux/core/actions';

import styles from './topNavbar.module.scss';

import { IProps, IState } from "./topNavbar";

class TopNavbar extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            colorPicker: false,
            bgComplete: true,
            checked: false,
            sectionStatus: false,
            colorStatus: false,
            typoStatus: true
        }

        this.fonts = [
            'Source Sans Pro',
            'Josefin Sans',
            'Calibri',
            'Cambria',
            'Garamond',
            'Georgia'
        ];

    }

    fonts: string[]

    handleChangeComplete = (color: string) => {
        const data = {
            color: color
        }
        appStore.dispatch(updateTheme(data));
    };

    handleTypoChange = (font: string) => {
        const data = {
            fontFamily: font
        }
        appStore.dispatch(updateTheme(data));
    };

    _colorBtnPress = () => {
        this.setState({
            bgComplete: !this.state.bgComplete,
            colorStatus: !this.state.colorStatus
        })
    }

    _sectionBtnPress = () => {
        this.setState({
            bgComplete: !this.state.bgComplete,
            sectionStatus: !this.state.sectionStatus
        })
    }

    _typoBtnPress = () => {
        this.setState({
            bgComplete: !this.state.bgComplete,
            typoStatus: !this.state.typoStatus
        })
    }

    _bgPress = () => {
        this.setState({
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

    _colorStatusTippyContent = () => {
        let { theme } = this.props;
        return (
            <div className={styles.topNavbarCirclePicker}>
                {
                    AppConfig.materialColors.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={[styles.colorCircleItem, item === theme.color &&  styles.colorCircleItemActive].join(' ')}
                                style={{
                                    background: item,
                                    borderColor: item
                                }}
                                onClick={() => this.handleChangeComplete(item)}
                            />
                        )
                    })
                }
                
                <div className={styles.colorInput}>
                    <input
                        type="text"
                        value={theme.color}
                        style={{ color: theme.color }}
                        onChange={(e) => this.handleChangeComplete(e.target.value)}
                    />
                </div>
            </div>
        )
    }

    _typoStatusTippyContent = () => {
        let { theme } = this.props;
        return (
            <div className={styles.typoContent}>
                {
                    this.fonts.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.typoContentItem}
                                style={{
                                    fontFamily: item,
                                    color: theme.fontFamily === item ? '#000' : '#444',
                                    fontWeight: theme.fontFamily === item ? 700 : 400,
                                    fontSize: theme.fontFamily === item ? '19px' : '17px'
                                }}
                                onClick={() => this.handleTypoChange(item)}
                            >
                                {item}
                            </div>
                        )
                    })
                }
            </div>
        )
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
        let { theme } = this.props;
        let { bgComplete } = this.state;
        return (
            <>
            {
                bgComplete &&
                    <div className={styles.bgComplete} onClick={this._bgPress} />
            }
            <div className={styles.TopNavbar}>
    
                <Tippy
                    visible={this.state.colorStatus}
                    onClickOutside={() => this.setState({ colorStatus: false, bgComplete: !this.state.bgComplete })}
                    className="customTippy colorTippy"
                    content={this._colorStatusTippyContent()}
                    interactive={true}
                    delay={200}
                    duration={[400, 200]}
                    maxWidth={160}
                    placement='bottom'
                    arrow
                >
                    <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')} onClick={this._colorBtnPress}>
                        <div className={[styles.topNavbarColor].join(' ')}>

                            <div className={styles.topPart} style={{ color: theme.color }}>
                                {/* <i className="material-icons">color_lens</i> */}
                                <i className="material-icons">colorize</i>
                                {/* <i className="material-icons">brush</i> */}
                            </div>

                            <div className={styles.bottomPart}>
                                Color
                            </div>
                        </div>
                    </div>
                </Tippy>

                <Tippy
                    visible={this.state.typoStatus}
                    onClickOutside={() => this.setState({ typoStatus: false, bgComplete: !this.state.bgComplete })}
                    className="customTippy typoTippy"
                    content={this._typoStatusTippyContent()}
                    interactive={true}
                    delay={200}
                    duration={[400, 200]}
                    maxWidth={250}
                    placement='bottom'
                    arrow
                >
                    <div
                        className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}
                        onClick={this._typoBtnPress}
                        style={{ flex: 1.2 }}
                    >
                        <div className={[styles.topNavbarTypography].join(' ')}>
                            <div className={styles.topPart}>
                                <i className="material-icons">font_download</i>
                            </div>
                            <div className={styles.bottomPart}>
                            Typography
                            </div>
                        </div>
                    </div>
                </Tippy>

                {/* <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')}>
                    <div className={[styles.topNavbarTypography].join(' ')}>
                        <div className={styles.topPart}>
                            <SelectFont />
                        </div>
                        <div className={styles.bottomPart}>
                        Typography
                        </div>
                    </div>
                </div> */}
                
                <Tippy
                    visible={this.state.sectionStatus}
                    onClickOutside={() => this.setState({ sectionStatus: false, bgComplete: !this.state.bgComplete })}
                    className="customTippy sectionTippy"
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

            </div>
            </>
        )
     }
}

/* Export Component =============================== */
export default TopNavbar;