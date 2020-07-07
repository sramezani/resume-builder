import React from 'react';
import { connect } from 'react-redux';
import { TweenLite } from 'gsap/dist/gsap';
import Link from 'next/link';

import styles from './style-old.module.scss';

// import { TProps, TState } from "./home";
interface TProps {
    theme: {
        color: string;
        fontFamily: string;
    };
}
interface TState {
    currentPage: number;
    activeSlide: number;
    canScroll: boolean;
}

class Home extends React.Component<TProps, TState> {
    constructor(props: TProps) {
        super(props);
        this.state = {
            currentPage: 0,
            activeSlide: 1,
            canScroll: true,
        };

        this.prev = 0;
        this.bgImage = null;
        this.slide1Box = null;
        this.slide2Text = null;
        this.slide3All = null;
        this.slide3Img = null;
        this.slide3Text = null;
        this.myTween = null;

        this.touchYStart = 0;
    }

    prev: number;
    touchYStart: number;
    bgImage: HTMLDivElement | null;
    slide1Box: HTMLDivElement | null;
    slide2Text: HTMLDivElement | null;
    slide3All: HTMLDivElement | null;
    slide3Img: HTMLDivElement | null;
    slide3Text: HTMLDivElement | null;
    myTween: ReturnType<typeof TweenLite.to> | null;

    componentDidMount() {
        this.prev = window.scrollY;
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('keyup', this._handleKeyDown);
        window.addEventListener('touchstart', this._touchStartHandle, false);
        window.addEventListener('touchend', this._touchEndHandle, false);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('keyup', this._handleKeyDown);
        window.removeEventListener('touchstart', this._touchStartHandle, false);
        window.removeEventListener('touchend', this._touchEndHandle, false);
    }

    _canScroll = (status: boolean, time = 0) => {
        setTimeout(() => {
            this.setState({
                canScroll: status,
            });
        }, time);
    };

    _animeDown1to2 = () => {
        this.myTween = TweenLite.to(this.slide1Box, 0.3, { y: 300, opacity: 0 });
        this.myTween = TweenLite.to(this.bgImage, 0.5, { transform: 'scale(1.8)', top: '45vh', left: '400px', filter: 'brightness(1)' });
        this.myTween = TweenLite.to(this.slide2Text, 0.6, { bottom: '35%', opacity: 1 });
        this._canScroll(true, 600);
    };
    _animeDown2to3 = () => {
        this.myTween = TweenLite.to(this.bgImage, 0.5, { top: '-100%', left: '400px', opacity: 0 });
        this.myTween = TweenLite.to(this.slide2Text, 0.5, { bottom: '100%', opacity: 0 });

        // this.myTween = TweenLite.to(this.slide3All, .5, {top: '25%', opacity: 1});
        this.myTween = TweenLite.to(this.slide3Text, 0.7, { bottom: '50%', opacity: 1 });
        this.myTween = TweenLite.to(this.slide3Img, 0.5, { bottom: '0%', opacity: 1 });
        this._canScroll(true, 600);
    };

    _animeUp2to1 = () => {
        this.myTween = TweenLite.to(this.bgImage, 0.4, { transform: 'scale(1)', top: '15vh', left: '0px', filter: 'brightness(0.7)' });
        this.myTween = TweenLite.to(this.slide1Box, 0.5, { y: 0, opacity: 1 });
        this.myTween = TweenLite.to(this.slide2Text, 0.4, { bottom: '-30%', opacity: 0 });
        this._canScroll(true, 500);
    };

    _animeUp3to2 = () => {
        this.myTween = TweenLite.to(this.bgImage, 0.5, { top: '45vh', left: '400px', opacity: 1 });
        this.myTween = TweenLite.to(this.slide2Text, 0.5, { bottom: '35%', opacity: 1 });

        // this.myTween = TweenLite.to(this.slide3All, .5, {top: '100%', opacity: 0});
        this.myTween = TweenLite.to(this.slide3Text, 0.5, { bottom: '-100%', opacity: 0 });
        this.myTween = TweenLite.to(this.slide3Img, 0.5, { bottom: '-100%', opacity: 0 });
        this._canScroll(true, 600);
    };

    handleScroll = () => {
        // if (this.prev > window.scrollY) {
        //     console.log("scrolling up");
        //     this._animeSmall();
        // }
        // else if (this.prev < window.scrollY) {
        //     console.log("scrolling down");
        //     this._animeBig()
        // }
        // this.prev = window.scrollY;
    };

    _startAnimationDown = () => {
        const { activeSlide } = this.state;
        console.log('down', activeSlide);
        if (activeSlide === 2) {
            this._animeDown1to2();
        } else if (activeSlide === 3) {
            this._animeDown2to3();
        }
    };
    _startAnimationUp = () => {
        const { activeSlide } = this.state;
        console.log('up', activeSlide);
        if (activeSlide === 1) {
            this._animeUp2to1();
        } else if (activeSlide === 2) {
            this._animeUp3to2();
        }
    };

    _animationUpChecking = () => {
        const { activeSlide } = this.state;
        if (activeSlide > 1) {
            this.setState(
                {
                    canScroll: false,
                    activeSlide: activeSlide - 1 < 1 ? 1 : activeSlide - 1,
                },
                () => {
                    this._startAnimationUp();
                }
            );
        }
    };
    _animationDownChecking = () => {
        const { activeSlide } = this.state;
        if (activeSlide < 3) {
            this.setState(
                {
                    canScroll: false,
                    activeSlide: activeSlide + 1,
                },
                () => {
                    this._startAnimationDown();
                }
            );
        }
    };

    _handleWheel = (e: any) => {
        const { canScroll } = this.state;
        if (!canScroll) {
            return;
        }

        if (e.deltaY < 0) {
            this._animationUpChecking();
        } else {
            this._animationDownChecking();
        }
    };

    _handleKeyDown = (e: any) => {
        const { canScroll } = this.state;
        if (!canScroll) {
            return;
        }
        if (e.keyCode === 38) {
            this._animationUpChecking();
        } else if (e.keyCode === 40) {
            this._animationDownChecking();
        }
    };

    _scrollDown = () => {
        const { canScroll } = this.state;
        if (!canScroll) {
            return;
        }
        this._animationDownChecking();
    };

    _touchStartHandle = (e: any) => {
        e.preventDefault();
        this.touchYStart = e.changedTouches[0].pageY;
    };
    _touchEndHandle = (e: any) => {
        const { canScroll } = this.state;
        const endTouchY = e.changedTouches[0].pageY;
        if (!canScroll) {
            return;
        }
        if (this.touchYStart > endTouchY) {
            this._animationDownChecking();
        } else {
            this._animationUpChecking();
        }
    };

    render() {
        return (
            <div className={styles.homePage}>
                <nav className={styles.nav}>
                    <div className={styles.insideNav}>
                        <div className={styles.navLeft}>
                            <img src="/images/logo1.png" alt="wtfresume logo (resume builder)" />
                        </div>
                        <div className={styles.navRight}>
                            <div className={styles.navItem}>
                                <Link href="/resume-builder">Create My Resume</Link>
                            </div>
                            <div className={styles.navItem}>EN</div>
                            <div className={styles.navItem}>
                                <a href="https://github.com/sramezani/resume-builder" target="_blank" rel="noopener noreferrer">
                                    github
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* <div className={styles.xxxxx}>

                </div> */}

                <div className={[styles.slide, styles.slide1].join(' ')} onWheel={(e) => this._handleWheel(e)}>
                    <div className={styles.container}>
                        <div ref={(e) => (this.bgImage = e)} className={styles.firstImg}>
                            <img src="/images/bg.png" alt="first slide image home page" />
                        </div>
                        <div className={styles.slide1Box} ref={(e) => (this.slide1Box = e)}>
                            <div className={styles.slide1Text}>
                                <h1>Who cares who you are</h1>
                                <p>design your resume and prove yourself</p>
                            </div>
                            <div className={styles.slide1crBtn}>
                                <div className={styles.crBtn}>
                                    <Link href="/resume-builder">Build My Resume</Link>
                                </div>
                            </div>
                            <div className={styles.slide1scrollDown}>
                                <div className={styles.scrollDown} onClick={() => this._scrollDown()}>
                                    <i className="material-icons">arrow_downward</i>
                                </div>
                            </div>
                        </div>

                        <div className={[styles.slide2].join(' ')} ref={(e) => (this.slide2Text = e)}>
                            <h2>why trying us?</h2>
                            <p>It&lsquo;s 100% free</p>
                            <p>It&lsquo;s easy to use</p>
                            <p>It makes a minute</p>
                            <p>No need register</p>
                            <p>real time design</p>
                            <div className={styles.slide1scrollDown}>
                                <div className={styles.scrollDown} onClick={() => this._scrollDown()}>
                                    <i className="material-icons">arrow_downward</i>
                                </div>
                            </div>
                        </div>

                        <div className={[styles.slide3].join(' ')} ref={(e) => (this.slide3All = e)}>
                            <div className={styles.slide3ImgBox} ref={(e) => (this.slide3Img = e)}>
                                {/* <img src="/images/resume-pic.jpg" alt="resume image" /> */}
                                <video autoPlay loop poster="/images/resume-pic.jpg" controls>
                                    <source src="video/resume.mp4" type="video/mp4" />
                                    <source src="video/resume.webm" type="video/webm" />
                                </video>
                            </div>
                            <div ref={(e) => (this.slide3Text = e)} className={styles.slide3text}>
                                <p>You can save your data and use in the future. what do you think! its amazing?</p>

                                <div className={styles.crBtn}>
                                    <Link href="/resume-builder">WTF! Show me how</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store: any) => ({
    theme: store.theme,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
