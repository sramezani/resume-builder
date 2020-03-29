import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../components/Text';
import TopNavbar from '../../components/TopNavbar';

import WorkExperience from './Elements/WorkExperience';
import Education from './Elements/Education';
import Skills from './Elements/Skills';

class Home extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render(){
        return(
            <div style={{ fontFamily: this.props.theme.fontFamily }}>
                <div className="loading" style={{ background: this.props.theme.color }}>
                    <div className="loading_gradient">
                    </div>
                </div>

                <TopNavbar />

                <div className="container">
                    <div className="insideCon">

                        <div>
                            <Text
                                value={this.props.userData.name}
                                statename="userData.name"
                                placeholder="Your Name"
                                customclass="name"
                            />
                        </div>
                        <div className="underName" />

                        <div className="info box">
                            {/* <span className="title">
                                Personal info
                            </span> */}
                            <Text
                                value={this.props.userData.infoTitle}
                                statename="userData.infoTitle"
                                placeholder="Personal info"
                                customclass="title"
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

                            {/* <p>
                                <a href="https://www.linkedin.com/in/siamak-ramezani">
                                    https://www.linkedin.com/in/siamak-ramezani
                                </a>
                            </p>
                            <p>
                                <a href="https://github.com/sramezani">
                                https://github.com/sramezani
                                </a>
                            </p> */}
                        </div>

                        <div className="profile box">
                            <Text
                                value={this.props.userData.profileTitle}
                                statename="userData.profileTitle"
                                placeholder="Profile"
                                customclass="title"
                                tag="div"
                            />
                            <Text
                                value={this.props.userData.profile}
                                statename="userData.profile"
                                placeholder="I'm a full-stack developer..."
                            />

                        </div>

                        <div className="workExperience box">
                            <Text
                                value={this.props.userData.workExperienceTitle}
                                statename="userData.workExperienceTitle"
                                placeholder="Work experience"
                                customclass="title"
                                tag="div"
                            />

                            <WorkExperience
                                data={this.props.workExperience}
                            />

                        </div>

                        <div className="education box">
                            <Text
                                value={this.props.userData.educationTitle}
                                statename="userData.educationTitle"
                                placeholder="Education"
                                customclass="title"
                                tag="div"
                            />

                            <Education
                                data={this.props.education}
                            />
                        </div>

                        <div className="skills box">
                            <Text
                                value={this.props.userData.skillsTitle}
                                statename="userData.skillsTitle"
                                placeholder="Skills"
                                customclass="title"
                                tag="div"
                            />

                            <Skills
                                data={this.props.skills}
                            />
                        </div>

                    </div>
                </div>
            </div>
        )
     }
}


Home.propTypes = {
    theme: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    workExperience: PropTypes.array.isRequired,
    education: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
};

Home.defaultProps = {
};

/* Export Component =============================== */
export default Home;