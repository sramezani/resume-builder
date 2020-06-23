import React from 'react';
import { connect } from 'react-redux';
import download from 'downloadjs';
import Head from 'next/head';
import styles from './style.module.scss';
import { One } from '@template';

import { Util } from '@lib';
import Router from 'next/router';

import { importUserData, exportUserData } from '../../src/redux/core/actions';
import { Loading } from '@component';
import { appStore } from '../../src/redux/store';

interface IProps {
	theme: {
		color: string,
		fontFamily: string
	},
	itemStatus: {
		[key: string]: boolean
    },
    userData: {
        [key: string]: string
    }
}
interface IState {
    exportStatus: any,
    gifGenerateStatus: Boolean
    // exportStatus: Boolean | string | null
}

class Home extends React.Component<IProps, IState> {
	
	constructor(props: IProps) {
		super(props);
		this.state = { 
            exportStatus: false,
            gifGenerateStatus: false
		};
    }
    
    componentDidMount() {
        const exportStatus = Util.getQueryString(window.location, 'export');
        this.setState({ exportStatus });

        const data = Util.getQueryString(window.location, 'data');
        if (exportStatus === 'true' && data) {

            fetch(`https://api.wtfresume.com/download?data=${data}`)
            .then(response => response.json())
            .then(res => {
                importUserData(JSON.parse(JSON.stringify(res)))
            });


        }
    }

    _downloadPDFBtnPress = async () => {
        const { userData } = this.props;
        const data = appStore.dispatch(exportUserData());
        const fileName = `CV-${userData.name}.pdf`;

        this.setState({ gifGenerateStatus: true });

        const req = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const res = await fetch('https://api.wtfresume.com/download', req);
        const blob = await res.blob();
        this.setState({ gifGenerateStatus: false });
        download(blob, fileName);
    }
    
    render() { 
    return (
			<>
            <Head>
                <title>preview | wtfresume</title>
            </Head>
            <div style={{ fontFamily: this.props.theme.fontFamily }}>
                {
                    this.state.exportStatus !== 'true' &&
                        <>
                            <div className={styles.bgLayer} />

                            <div className={styles.topNav}>
                                <div className={styles.left}>
                                    <i className="material-icons" onClick={() => Router.back()}>keyboard_backspace</i>
                                </div>

                                <div className={["verticalCenter", styles.right].join(" ")}>
                                    <span onClick={this._downloadPDFBtnPress}>
                                    Download as PDF
                                    </span>
                                </div>
                            </div>
                        </>
                }

                <div className={[styles.container, this.state.exportStatus !== 'true' && styles.previewContainer].join(' ')}>

                    <One />

                </div>

                <Loading show={this.state.gifGenerateStatus} />
            </div>
            </>
		);
	}
}

const mapStateToProps = (store:any) => ({
    theme: store.theme,
    itemStatus: store.itemStatus,
    userData: store.userData
});

const mapDispatchToProps = () => ({
    importUserData
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);