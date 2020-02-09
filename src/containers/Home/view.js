import React from 'react';
import PropTypes from 'prop-types';

import Text from '../../components/Text';
import WorkExperience from './Elements/WorkExperience';

class Home extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render(){
        return(
            <>
                <div className="loading" style={{ background: this.props.theme.color }}>
                    <div className="loading_gradient">
                    </div>
                </div>
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

                            {/* <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                    May 2019 – Present
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        Mobile App (React Native) Developer
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        Finology - Fintech Company - Malaysia
                                    </span>
                                    <p className="companyExplain">
                                        Malaysian Fintech company driving change in the banking, property, and insurance industries
                                    </p>
                                    <ul className="xxx">
                                        <li>
                                            Refactor existing React Native App and add Redux to project, also good structure for codes
                                        </li>
                                        <li>
                                            Developed new applications with React Native (for Loanplus project)
                                        </li>
                                        <li>
                                        <span className="strong">Responsibility: </span>Bug fix, add new feature, also R&D about how can Integrate Blockchain into our projects (insurance)
                                        </li>
                                        <li>
                                            <span className="strong">Technologies:</span> React Native, Redux, Redux-thunk, firebase, Image OCR
                                        </li>
                                    </ul>
                                </div>
                            </div> */}

                        </div>

                        <div className="education box">
                            <span className="title">
                                Education
                            </span>
                            <p>
                                BSc. Software Engineering (Bu-Ali Sina University) - Iran
                            </p>
                        </div>

                        <div className="skills box">
                            <span className="title">
                                Skills
                            </span>
                            <ul className="skillRow">
                                <li className="flex1">
                                    javascript
                                </li>
                                <li className="flex1">
                                    Reactjs, React Native
                                </li>
                            </ul>
                            <ul className="skillRow">
                                <li className="flex1">
                                    jQuery, ES6, Tweenmax
                                </li>
                                <li className="flex1">
                                    Redux, Redux-Thunk
                                </li>
                            </ul>
                            <ul className="skillRow">
                                <li className="flex1">
                                    HTML/HTML5, CSS/CSS3
                                </li>
                                <li className="flex1">
                                    PHP
                                </li>
                            </ul>
                            <ul className="skillRow">
                                <li className="flex1">
                                    Wordpress, Woocommerce
                                </li>
                                <li className="flex1">
                                    MySQL, PostgreSQL
                                </li>
                            </ul>
                            <ul className="skillRow">
                                <li className="flex1">
                                    Git
                                </li>
                                {/* <li className="flex1">
                                    
                                </li> */}
                            </ul>
                            <ul className="skillRow">
                                <li className="flex1">
                                    Familiar with: Python, Tensorflow, Lua, Coronalabs
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </>
        )
     }
}


Home.propTypes = {
    theme: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    workExperience: PropTypes.array.isRequired,
};

Home.defaultProps = {
};

/* Export Component =============================== */
export default Home;