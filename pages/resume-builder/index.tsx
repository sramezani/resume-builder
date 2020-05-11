import React from 'react';
import { connect } from 'react-redux';

// import { Text } from '@component';

import styles from './style.module.scss';
import { TopNavbar } from '@component';
import { One } from '@template';
// import { Text, TopNavbar, WorkExperience, Education, Skills } from '@component';

// import { IProps, IState } from "./indexType";
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
    },
}
interface IState {}

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

                <TopNavbar
                    itemStatus={this.props.itemStatus}
                    theme={this.props.theme}
                    userData={this.props.userData}
                />

                <div className={styles.container}>

                    <One />

                </div>
            </div>
		);
	}
}

const mapStateToProps = (store:any) => ({
    theme: store.theme,
    userData: store.userData,
    itemStatus: store.itemStatus
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);