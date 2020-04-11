import React from 'react';
import { connect } from 'react-redux';

import { Text } from '@component';
import { WorkExperience, Education, Skills } from './Elements';
import styles from './one.module.scss';

import { IProps, IState } from "./one";

class Template extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
        }

    }


    render(){
        return (
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

                <div className={[styles.info, styles.box].join(' ')}>
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

                <div className={[styles.profile, styles.box].join(' ')}>
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

                <div className={[styles.workExperience, styles.box].join(' ')}>
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

                <div className={[styles.education, styles.box].join(' ')}>
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

                <div className={[styles.skills, styles.box].join(' ')}>
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
        )
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

/* Export Component =============================== */
export default connect(mapStateToProps, mapDispatchToProps)(Template);