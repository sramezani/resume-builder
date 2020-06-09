import React from 'react';
import { connect } from 'react-redux';

import styles from './style.module.scss';
import { One } from '@template';

import Router from 'next/router';

import { importUserData } from '../../src/redux/core/actions';

interface IProps {
	theme: {
		color: string,
		fontFamily: string
	},
	itemStatus: {
		[key: string]: boolean
    },
    importUserData: any
}
interface IState {}

class Home extends React.Component<IProps, IState> {
	
	constructor(props: IProps) {
		super(props);
		this.state = { 
			
		};
  }

  componentDidMount() {
    
    // const data = {};
    // this.props.importUserData(data)
  }

  render() { 
    return (
			<div style={{ fontFamily: this.props.theme.fontFamily }}>
                
                <div className={styles.bgLayer} />

                <div className={styles.topNav}>
                    <div className={styles.left}>
                        <i className="material-icons" onClick={() => Router.back()}>keyboard_backspace</i>
                    </div>

                    <div className={["verticalCenter", styles.right].join(" ")}>
                        <span>
                        Download as PDF
                        </span>
                    </div>
                </div>

                <div className={styles.container}>

                    <One />

                </div>
            </div>
		);
	}
}

const mapStateToProps = (store:any) => ({
    theme: store.theme,
    itemStatus: store.itemStatus
});

const mapDispatchToProps = () => ({
    importUserData
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);