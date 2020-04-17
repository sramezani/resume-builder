import React from 'react';
import { connect } from 'react-redux';
import { TweenLite } from "gsap";

import styles from './style.module.scss';

import { IProps, IState } from "./home";

class Home extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);
        this.state = { 
            currentPage: 0,
            activeSlide: 1,
            canScroll: true
        };

        this.prev = 0;
        this.bgImage = null;
        this.slide2Text = null;
        this.slide3All = null;
        this.slide3Img = null;
        this.slide3Text = null;
        this.myTween = null;
    }

    prev: number;
    bgImage: HTMLDivElement | null;
    slide2Text: HTMLDivElement | null;
    slide3All: HTMLDivElement | null;
    slide3Img: HTMLDivElement | null;
    slide3Text: HTMLDivElement | null;
    myTween: ReturnType<typeof TweenLite.to> | null;

    componentDidMount() {
        this.prev = window.scrollY;
        // console.log('this.prev', this.prev)
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('keyup', this._handleKeyDown);
        // this.myTween = TweenLite.to(this.bgImage, 2, {x: 300 , opacity:0});

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('keyup', this._handleKeyDown);
    }

    _canScroll = (status: boolean, time: number = 0) => {
        setTimeout(() => {
            this.setState({
                canScroll: status
            })
        }, time);
    }

    _animeDown1to2 = () => {
        this.myTween = TweenLite.to(this.bgImage, .5, {transform: 'scale(1.8)', top: '45vh', left: '400px'});
        this.myTween = TweenLite.to(this.slide2Text, .6, {bottom: '30%', opacity: 1});
        this._canScroll(true, 600);
    }
    _animeDown2to3 = () => {
        this.myTween = TweenLite.to(this.bgImage, .5, { top: '-100%', left: '400px', opacity: 0});
        this.myTween = TweenLite.to(this.slide2Text, .5, {bottom: '100%', opacity: 0});

        // this.myTween = TweenLite.to(this.slide3All, .5, {top: '25%', opacity: 1});
        this.myTween = TweenLite.to(this.slide3Text, .7, {bottom: '50%', opacity: 1});
        this.myTween = TweenLite.to(this.slide3Img, .5, {bottom: '15%', opacity: 1});
        this._canScroll(true, 600);
    }

    _animeUp2to1 = () => {
        this.myTween = TweenLite.to(this.bgImage, .4, {transform: 'scale(1)', top: '15vh', left: '0px'});
        this.myTween = TweenLite.to(this.slide2Text, .4, {bottom: '-30%', opacity: 0});
        this._canScroll(true, 500);
    }

    _animeUp3to2 = () => {

        this.myTween = TweenLite.to(this.bgImage, .5, { top: '45vh', left: '400px', opacity: 1});
        this.myTween = TweenLite.to(this.slide2Text, .5, {bottom: '30%', opacity: 1});

        // this.myTween = TweenLite.to(this.slide3All, .5, {top: '100%', opacity: 0});
        this.myTween = TweenLite.to(this.slide3Text, .5, {bottom: '-100%', opacity: 0});
        this.myTween = TweenLite.to(this.slide3Img, .5, {bottom: '-100%', opacity: 0});
        this._canScroll(true, 600);
    }

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
    }

    _startAnimationDown = () => {
        const { activeSlide } = this.state;
        console.log('down', activeSlide)
        if (activeSlide === 2) {
            this._animeDown1to2();
        }
        else if (activeSlide === 3) {
            this._animeDown2to3();
        }
    }
    _startAnimationUp = () => {
        const { activeSlide } = this.state;
        console.log('up', activeSlide)
        if (activeSlide === 1) {
            this._animeUp2to1();
        }
        else if (activeSlide === 2) {
            this._animeUp3to2();
        }
    }

    _handleWheel = (e: any) => {
        const { activeSlide, canScroll } = this.state;
        if (!canScroll) {
            return;
        }

        if (e.deltaY < 0) {
            if (activeSlide > 1) {
                this.setState({
                    canScroll: false,
                    activeSlide: (activeSlide - 1) < 1 ? 1 : activeSlide - 1
                }, () => {
                    this._startAnimationUp()
                })
            }
        }
        else {
            if (activeSlide < 3) {
                this.setState({
                    canScroll: false,
                    activeSlide: activeSlide + 1
                }, () => {
                    this._startAnimationDown()
                })
            }
        }
    }

    _handleKeyDown = (e: any) => {
        const { activeSlide, canScroll } = this.state;
        if (!canScroll) {
            return;
        }
        if (e.keyCode === 38) {
            if (activeSlide > 1) {
                this.setState({
                    canScroll: false,
                    activeSlide: (activeSlide - 1) < 1 ? 1 : activeSlide - 1
                }, () => {
                    this._startAnimationUp()
                })
            }
        }
        else if (e.keyCode === 40) {
            if (activeSlide < 3) {
                this.setState({
                    canScroll: false,
                    activeSlide: activeSlide + 1
                }, () => {
                    this._startAnimationDown()
                })
            }
        }
    }

    render() {
        return (
            <div className={styles.homePage}>
                {/* <nav className={styles.nav}>
                    safsa
                </nav> */}


                <div
                    className={[styles.slide, styles.slide1].join(' ')}
                    onWheel={(e) => this._handleWheel(e)}
                    // onKeyDown={(e) => this._handleKeyDown(e)}
                >
                    <div className={styles.container}>
                        
                        <div ref={e => this.bgImage = e} className={styles.firstImg}>
                            <img src="/bg2.png" alt="first slide image home page" />
                        </div>
    
                        <div className={[styles.slide2].join(' ')} ref={e => this.slide2Text = e}>
                            <h2>Second Component</h2>
                            <p>
                            Second Component Second Component Second Component Second Component Second Component 
                            Second Component Second Component Second Component Second Component Second Component 
                            Second Component Second Component Second Component 
                            </p>
                        </div>

                        <div className={[styles.slide3].join(' ')} ref={e => this.slide3All = e}>
                            <div className={styles.slide3ImgBox} ref={e => this.slide3Img = e}>
                                <img src="/resume.png" alt="resume image" />
                            </div>
                            <div ref={e => this.slide3Text = e} className={styles.slide3text}>
                                <p>
                                test test test test test test test test test test test test test test test 
                                test test test test test test test test test test test test test test test 
                                </p>
                            </div>
                        </div>

                    </div>


                </div>
                
                

            </div>
        );
    }
}

const mapStateToProps = (store:any) => ({
    theme: store.theme,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);