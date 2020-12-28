import React from 'react';
import { connect } from 'react-redux';

import { Text } from '@component';
import { WorkExperience, Education, Skills, Photo } from './Elements';
import styles from './one.module.scss';

import { TProps } from './Types';

class Template extends React.Component<TProps> {
    constructor(props: TProps) {
        super(props);
    }

    render() {
        const { itemStatus } = this.props;
        return (
            <div className={styles.insideCon}>
                <Text value={this.props.userData.name} statename="userData.name" placeholder="Your Name" customclass={styles.name} />
                <div className={styles.underName} style={{ borderTopColor: this.props.theme.color }} />

                {itemStatus.picture && (
                    <div className={styles.image}>
                        <Photo userData={this.props.userData} />
                    </div>
                )}

                {itemStatus.info && (
                    <div className={[styles.info, styles.box].join(' ')}>
                        <Text
                            value={this.props.userData.infoTitle}
                            statename="userData.infoTitle"
                            placeholder="Personal info"
                            customclass={styles.title}
                            tag="div"
                        />
                        <Text value={this.props.userData.address} statename="userData.address" placeholder="address: Berlin, Germany" />
                        <Text value={this.props.userData.email} statename="userData.email" placeholder="sample@email.com" />
                        <Text value={this.props.userData.mobile} statename="userData.mobile" placeholder="(+1) 123 456 7890" />
                        <Text value={this.props.userData.userData} statename="userData.userData" placeholder="Your other data" />
                    </div>
                )}

                {itemStatus.profile && (
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
                )}

                {itemStatus.workExperience && (
                    <div className={[styles.workExperience, styles.box].join(' ')}>
                        <Text
                            value={this.props.userData.workExperienceTitle}
                            statename="userData.workExperienceTitle"
                            placeholder="Work experience"
                            customclass={styles.title}
                            tag="div"
                        />
                        <WorkExperience data={this.props.workExperience} color={this.props.theme.color} />
                    </div>
                )}

                {itemStatus.education && (
                    <div className={[styles.education, styles.box].join(' ')}>
                        <Text
                            value={this.props.userData.educationTitle}
                            statename="userData.educationTitle"
                            placeholder="Education"
                            customclass={styles.title}
                            tag="div"
                        />
                        <Education data={this.props.education} />
                    </div>
                )}

                {itemStatus.skills && (
                    <div className={[styles.skills, styles.box].join(' ')}>
                        <Text
                            value={this.props.userData.skillsTitle}
                            statename="userData.skillsTitle"
                            placeholder="Skills"
                            customclass={styles.title}
                            tag="div"
                        />

                        <Skills data={this.props.skills} />
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (store: any) => ({
    theme: store.theme,
    userData: store.userData,
    workExperience: store.workExperience,
    education: store.education,
    skills: store.skills,
    itemStatus: store.itemStatus,
});

const mapDispatchToProps = () => ({});

/* Export Component =============================== */
export default connect(mapStateToProps, mapDispatchToProps)(Template);
