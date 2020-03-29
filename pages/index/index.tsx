import React from 'react';
import { connect } from 'react-redux';

// import { Text } from '@component';

import styles from './style.module.scss';
import { Text, TopNavbar, WorkExperience, Education, Skills } from '@component';

// import Text from '@component/Text';
// import TopNavbar from '@component/TopNavbar';
// import WorkExperience from '@component/WorkExperience';
// import Education from '@component/Education';
// import Skills from '@component/Skills';

// import { BoxGray, BoxGreen, BoxLemon, BoxYellow } from "@component";

// import { BoxGray, BoxGreen, BoxLemon, BoxYellow } from "../../src/component";

// import { Container, Left, Middle, Right, LeftTop, LeftBottom } from "./Style";

interface IProps {
	theme: {
		color: string,
		fontFamily: string
    },
    userData: {
        name: string,
        infoTitle: string,
        address: string,
        email: string,
        mobile: string,
        userData: string,
        profileTitle: string,
        profile: string,
        workExperienceTitle: string,
        educationTitle: string,
        skillsTitle: string
    },
    workExperience: [],
    education: [],
    skills: []
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

                <TopNavbar />

                <div className={styles.container}>
                    <div className={styles.insideCon}>

                        <div>
                            <Text
                                value={this.props.userData.name}
                                statename="userData.name"
                                placeholder="Your Name"
                                customclass={styles.name}
                            />
                        </div>
                        <div className={styles.underName} />

                        <div className={styles.info + ' ' + styles.box}>
                            <Text
                                value={this.props.userData.infoTitle}
                                statename="userData.infoTitle"
                                placeholder="Personal info"
                                customclass={styles.title}
                                tag="div"
                            />
                            <Text
                                value={this.props.userData.address}
                                statename="userData.address"
                                placeholder="address: Berlin, Germany"
                            />
                            <Text
                                value={this.props.userData.email}
                                statename="userData.email"
                                placeholder="sample@email.com"
                            />
                            <Text
                                value={this.props.userData.mobile}
                                statename="userData.mobile"
                                placeholder="(+1) 123 456 7890"
                            />
                            <Text
                                value={this.props.userData.userData}
                                statename="userData.userData"
                                placeholder="Your other data"
                            />
                        </div>

                        <div className={styles.profile + ' ' + styles.box}>
                            <Text
                                value={this.props.userData.profileTitle}
                                statename="userData.profileTitle"
                                placeholder="Profile"
                                customclass={styles.title}
                                tag="div"
                            />
                            <Text
                                value={this.props.userData.profile}
                                statename="userData.profile"
                                placeholder="I'm a full-stack developer..."
                            />

                        </div>

                        <div className={styles.workExperience + ' ' + styles.box}>
                            <Text
                                value={this.props.userData.workExperienceTitle}
                                statename="userData.workExperienceTitle"
                                placeholder="Work experience"
                                customclass={styles.title}
                                tag="div"
                            />

                            <WorkExperience
                                data={this.props.workExperience}
                            />

                        </div>

                        <div className={styles.education + ' ' + styles.box}>
                            <Text
                                value={this.props.userData.educationTitle}
                                statename="userData.educationTitle"
                                placeholder="Education"
                                customclass={styles.title}
                                tag="div"
                            />

                            <Education
                                data={this.props.education}
                            />
                        </div>

                        <div className={styles.skills + ' ' + styles.box}>
                            <Text
                                value={this.props.userData.skillsTitle}
                                statename="userData.skillsTitle"
                                placeholder="Skills"
                                customclass={styles.title}
                                tag="div"
                            />

                            <Skills
                                data={this.props.skills}
                            />
                        </div>

                    </div>
                </div>
            </div>
		);
	}
}

const mapStateToProps = (state:any) => ({
    theme: state.theme,
    userData: state.userData,
    workExperience: state.workExperience,
    education: state.education,
    skills: state.skills
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);