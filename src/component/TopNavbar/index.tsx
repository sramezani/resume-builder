import React from 'react';
// import { CirclePicker } from 'react-color';
import Tippy from '@tippyjs/react';
import Switch from "react-switch";
import Link from 'next/link';
// import ReactModal from 'react-modal';
import Modal from 'react-awesome-modal';

import download from 'downloadjs';

import AppConfig from '../../constant/config';
import { appStore } from '../../redux/store';
import { updateTheme, updateItemStatus, exportUserData, importUserData } from '../../redux/core/actions';

import styles from './topNavbar.module.scss';

import { IProps, IState } from "./topNavbar";

class TopNavbar extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            colorPicker: false,
            bgComplete: false,
            checked: false,
            sectionStatus: false,
            colorStatus: false,
            typoStatus: false,
            saveModal: false,
            loadModal: false,
            uploadErrMsg: false
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
        const { userData } = this.props;
        const fileName = `CV-${userData.name}.pdf`;

        const res = await fetch('http://localhost:3007/download');
        const blob = await res.blob();
        download(blob, fileName);

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

    _saveBtnPress = async () => {
        const { userData } = this.props;

        const data = appStore.dispatch(exportUserData());
        const fileName = `CV-${userData.name}`;
        const json = JSON.stringify(data);
        const blob = new Blob([json],{type:'application/json'});
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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

    uploadFile = async (e: any) => {

        const reg = /(.*?)\.(json)$/;
        e.preventDefault();

        if(!e.target.files[0].name.match(reg)) {
            this.setState({
                uploadErrMsg: true
            })
            return;
        }

        const reader = new FileReader()
        reader.onload = async (e: any) => { 
            const text = (e.target.result)
            console.log(text)
            importUserData(text);
            this.setState({
                loadModal: false
            })
        };
        reader.onerror = error => console.log(error)
        reader.readAsText(e.target.files[0]);
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

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')} onClick={() => this.setState({ saveModal: true })}>
                    <div className={styles.topNavbarSave}>
                        <div className={styles.topPart}>
                            <i className="material-icons">save</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Save
                        </div>
                    </div>
                </div>

                <div className={[styles.item, styles.tonNavbarBorderRight, styles.tonNavbarFelx1].join(' ')} onClick={() => this.setState({ loadModal: true })}>
                    <div className={styles.topNavbarLoad}>
                        <div className={styles.topPart}>
                            <i className="material-icons">insert_drive_file</i>
                        </div>
                        <div className={styles.bottomPart}>
                            Load
                        </div>
                        
                    </div>
                </div>

                <Link href="/preview">
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
                </Link>

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

            <Modal 
                visible={this.state.saveModal}
                width="300"
                height="280"
                effect="fadeInDown"
                onClickAway={() => this.setState({ saveModal: false })}
            >
                <div className={styles.saveModal}>
                    <h3>
                        Save Your Data
                    </h3>
                    <p>
                        By storing your information, in the future you can use it to edit your resume.
                    </p>

                    <div
                        className={styles.saveModalBtn}
                        onClick={() => {
                            this._saveBtnPress();
                            this.setState({ saveModal: false });
                        }}
                    >
                        SAVE
                    </div>
                </div>
            </Modal>

            <Modal 
                visible={this.state.loadModal}
                width="300"
                height="280"
                effect="fadeInDown"
                onClickAway={() => this.setState({ loadModal: false })}
            >
                <div className={styles.loadModal}>
                    <h3>
                        Upload Your Data
                    </h3>
                    <p>
                        You can re-edit your information by uploading your saved file.
                    </p>
                    <div className={styles.uploadModalBtn}>
                        <label htmlFor="uploadFile" >
                            CHOOSE FILE
                        </label> 
                    </div>
                    <input
                        type="file"
                        id="uploadFile"
                        className={styles.uploadModalFileType}
                        accept="application/JSON"
                        onChange={(e) => {
                            this.setState({ uploadErrMsg: false });
                            this.uploadFile(e);
                        }}
                        onClick={(e: any)=> { 
                            e.target.value = null
                       }}
                    />
                    {
                        this.state.uploadErrMsg &&
                            <span>
                                Uploaded file format is wrong 
                            </span>
                    }
                </div>
            </Modal>

            </>
        )
     }
}

/* Export Component =============================== */
export default TopNavbar;