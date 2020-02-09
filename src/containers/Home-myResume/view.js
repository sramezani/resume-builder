import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        };
    }

//     I developed application with React Native similar to Inkitt.
// You can find here: https://play.google.com/store/apps/details?id=com.bookapo&hl=en
// Bookapo is like (Blinkist) that you can listen and read book.
// Bookapo app have 2 mod online and offline for read and listen books.

    render(){
        return(
            <>
                <div className="loading">
                    <div className="loading_gradient">
                    </div>
                </div>
                <div className="container">
                    <div className="insideCon">

                        <div className="name">
                            Siamak Ramezani
                        </div>
                        <div className="underName" />

                        <div className="info box">
                            <span className="title">
                                Personal info
                            </span>
                            <p>
                                Address​: Kuala Lumpur, Malaysia
                            </p>
                            {/* <p>
                                Nationality​: Iranian
                            </p> */}
                            <p>
                                siamak.rp@gmail.com
                            </p>
                            <p>
                                (+60) 112 718 1011
                            </p>
                            <p>
                                <a href="https://www.linkedin.com/in/siamak-ramezani">
                                    https://www.linkedin.com/in/siamak-ramezani
                                </a>
                            </p>
                            <p>
                                <a href="https://github.com/sramezani">
                                https://github.com/sramezani
                                </a>
                            </p>
                        </div>

                        <div className="profile box">
                            <span className="title">
                                Profile
                            </span>
                            <p>
                            I'm a full-stack developer with a focus on the​ front-end​. I do the ​client-side part of the job.
                            </p>
                            <p>
                            I do create a mobile application (android, ios) with React Native.
                            </p>
                            <p>
                            I am an Agilist, a Team worker, Self-Learner, Result Oriented. Also I am interested in Blockchain technology and game development and in my free time, I read and study about that.
                            </p>
                            <p>
                            I love music and movie.
                            </p>
                        </div>

                        <div className="workExperience box">
                            <span className="title">
                                Work experience
                            </span>

                            <div className="workBox">
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
                                            Refactor existing React Native App structure and also adding Redux to project
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
                            </div>

                            <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                        Oct 2018 – Feb 2019
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        React Native Developer
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        Freelance Project - Bookapo​ - Iran
                                    </span>
                                    <p className="companyExplain">
                                        Bookapo​ is Reference Summarize the best books in the world like (Blinkist) that you can listen and read book
                                    </p>
                                    <ul className="xxx">
                                        <li>
                                        Developed Android and ios application with React Native
                                        </li>
                                        <li>
                                        <span className="strong">Technologies:</span> React Native, Redux, Redux-thunk, play sound, offline and online mode
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                        Aug 2018 – Nov 2018
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        React Native Developer
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        Freelance Project - Ellenex​ - Australia
                                    </span>
                                    <p className="companyExplain">
                                        Ellenex​ is (Australian IoT-based company) pioneer manufacturer of LPWAN (Low Power Wide Area Network) pressure and level sensors for Industrial Internet of Things (IIoT).
                                    </p>
                                    <ul className="xxx">
                                        <li>
                                            Developed Android and ios application with React Native
                                        </li>
                                        <li>
                                            Used tinode​ open source Instant messaging server.
                                        </li>
                                        <li>
                                        <span className="strong">Technologies:</span> React Native, Redux, Redux-thunk, WebSocket, Tinode WebSocket
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                        Apr 2017 – May 2018
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        Front-End Developer (React/React Native)
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        Snappfood – Online Food Delivery Service – Iran
                                    </span>
                                    <p className="companyExplain">
                                        SnappFood is a leading online food delivery service (subsidiary of Rocket Internet in Iran)
                                    </p>
                                    <ul className="xxx">
                                        <li>
                                        <span className="strong">Apr 2017 – ​ Nov 2017</span> I worked on the mobile version of Snappfood site by new technologies of Reactjs and Redux
                                        </li>
                                        <li>
                                        Build base config (reactjs, redux, redux-thunk, multi-language config) and base component.
                                        </li>
                                        <li>
                                        <span className="strong">Nov 2017 – ​ May 2018</span> I worked on the new Snappfood project (Snappmarket - online grocery shopping -​ https://snapp.market​). I developed
Snappmarket android and ios app by React Native and Redux.
                                        </li>
                                        <li>
                                            Developed Log system (include any action, touch and scroll in app)
                                        </li>
                                        <li>
                                        <span className="strong">Achievement​:</span> I am developed application with React Native (new technology in company) In order to
reduce the cost of the company and use the technology of the day.
                                        </li>
                                        <li>
                                        <span className="strong">Technologies:</span>React, Reactjs. React Native, Redux, Redux-thunk, Twig, Tweenmax
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>

                            <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                        Apr 2016 – Mar 2017
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        Co-Founder, Developer and CEO
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        Hyperka - Iran
                                    </span>
                                    <p className="companyExplain">
                                    Hyperka is a Market-Place which enabled people in Tehran to find and place order for their demanded grocery products in local market.
                                    </p>
                                    <ul className="xxx">
                                        <li>
                                            We accepted in final 10 teams in Avatech startup accelerator
                                        </li>
                                        <li>
                                            My responsibility was growing business and manage team
                                        </li>
                                        <li>
                                            I developed Hyperka site by Woocommerce.
                                        </li>
                                        <li>
                                        <span className="strong">Technologies:</span> Wordpress, Woocommerce, Bootstrap, JQuery
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                        Aug 2015 – Apr 2016​
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        Web Developer
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        E-Carevan - Iran
                                    </span>
                                    <p className="companyExplain">
                                        Ecarvan is a Marketplace for tour and travel packages
                                    </p>
                                    <ul className="xxx">
                                        <li>
                                            I developed eCarevan site with PHP for server-side
                                        </li>
                                        <li>
                                            Used Bootstrap and JQuery for front-end
                                        </li>
                                        <li>
                                        <span className="strong">Technologies:</span> PHP, MySQL, Bootstrap, JQuery, Tweenmax
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="workBox">
                                <div className="leftWork">
                                    <span className="workDate">
                                        – Aug 2015
                                    </span>
                                </div>
                                <div className="RightWork">
                                    <div className="workDot" />
                                    <span className="workTitle">
                                        Freelancer
                                    </span>
                                    <br />
                                    <span className="workCompany">
                                        More than 3 years of work experience as Freelancer - Iran
                                    </span>
                                    <ul className="xxx">
                                        <li>
                                        I worked as Freelancer with these Technologies: PHP, WordPress, Bootstrap, Javascript, jQuery, MySQL, PostgreSQL
                                        </li>
                                    </ul>
                                </div>
                            </div>

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
                                    Familiar with: Python, Tensorflow, Docker, Lua, Coronalabs
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
};

Home.defaultProps = {
};

/* Export Component =============================== */
export default Home;