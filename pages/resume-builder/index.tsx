import React from 'react';
import { connect } from 'react-redux';

// import { Text } from '@component';

import styles from './style.module.scss';
import { TopNavbar, Footer } from '@component';
import { One } from '@template';
// import { Text, TopNavbar, WorkExperience, Education, Skills } from '@component';
import Head from 'next/head';
// import { TProps, TState } from "./indexType";
interface TProps {
    theme: {
        color: string;
        fontFamily: string;
    };
    itemStatus: {
        [key: string]: boolean;
    };
    userData: {
        [key: string]: string;
    };
}

class Home extends React.Component<TProps> {
    constructor(props: TProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <Head>
                    <title>resume builder | wtfresume</title>
                </Head>
                <div style={{ fontFamily: this.props.theme.fontFamily }}>
                    <div className={styles.loading} style={{ background: this.props.theme.color }}>
                        <div className={styles.loading_gradient}></div>
                    </div>

                    <TopNavbar itemStatus={this.props.itemStatus} theme={this.props.theme} userData={this.props.userData} />

                    <div className={styles.container}>
                        <One />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = (store: any) => ({
    theme: store.theme,
    userData: store.userData,
    itemStatus: store.itemStatus,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
