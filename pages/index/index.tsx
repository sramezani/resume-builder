import React from 'react';
import { connect } from 'react-redux';

// import { Text } from '@component';

import styles from './style.module.scss';
import { TopNavbar } from '@component';
import { One } from '@template';
// import { Text, TopNavbar, WorkExperience, Education, Skills } from '@component';

import { IProps, IState } from "./indexType";


class Home extends React.Component<IProps, IState> {
	
	constructor(props: IProps) {
		super(props);
		this.state = { 
			
		};
  }

  render() {
		return (
			<div style={{ fontFamily: this.props.theme.fontFamily }}>
                <div className={styles.loading} style={{ background: this.props.theme.color }}>
                    <div className={styles.loading_gradient}>
                    </div>
                </div>

                <TopNavbar />

                <div className={styles.container}>

                    <One />

                </div>
            </div>
		);
	}
}

const mapStateToProps = (state:any) => ({
    theme: state.theme
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);