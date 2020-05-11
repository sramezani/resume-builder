import React from 'react';
import Link from 'next/link';

import { HeaderNavbar } from '@component';

import styles from './style.module.scss';

export default function Home() {
    return (
        <div className={styles.homePage}>
            
            <HeaderNavbar />

            <div className="container">
                <section className={["row", styles.first].join(' ')}>
                    <div className={["col-md-6", styles.firstLeft].join(' ')}>
                        <h1>
                        Who cares who you are
                        </h1>
                        <p>
                        design your resume and prove yourself
                        </p>

                        <div className={styles.crBtn}>
                            <Link href="/resume-builder">
                            Build My Resume
                            </Link>
                        </div>
                    </div>
                    <div className={["col-md-6", styles.firstRight].join(' ')}>
                        <img src="/images/bg.png" alt="first slide image home page" className="imgResponsive" />
                    </div>
                </section>

                <section className={[styles.second].join(' ')}>
                    <div className={styles.secondTitle}>
                        <h2>
                            why trying us?
                        </h2>
                    </div>

                    <div className={["row justify-content-md-center", styles.itemsRow].join(' ')}>
                        <div className="col-md-10 row justify-content-md-center">
                            <div className="col-md-7">
                                <article className={['row', styles.item].join(' ')}>
                                    <div className={[styles.itemImg, styles.itemImgBg1].join(' ')}>
                                        <img src="images/icons/signs.png" alt="100% free" className="imgResponsive verticalCenter" />
                                    </div>
                                    <p>
                                        It's 100% free
                                    </p>
                                </article>
                            </div>
                            <div className="col-md-5">
                                <article className={['row', styles.item].join(' ')}>
                                    <div className={[styles.itemImg, styles.itemImgBg4].join(' ')}>
                                        <img src="images/icons/body.png" alt="easy to use" className="imgResponsive verticalCenter" />
                                    </div>
                                    <p>
                                        It's easy to use
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>

                    <div className={["row justify-content-md-center", styles.itemsRow].join(' ')}>
                        <div className="col-md-10 row justify-content-md-center">
                            <div className="col-md-7">
                                <article className={['row', styles.item].join(' ')}>
                                    <div className={[styles.itemImg, styles.itemImgBg2].join(' ')}>
                                        <img src="images/icons/time.png" alt="makes a minute" className="imgResponsive verticalCenter" />
                                    </div>
                                    <p>
                                    It makes a minute
                                    </p>
                                </article>
                            </div>
                            <div className="col-md-5">
                                <article className={['row', styles.item].join(' ')}>
                                    <div className={[styles.itemImg, styles.itemImgBg3].join(' ')}>
                                        <img src="images/icons/register.png" alt="No need register" className="imgResponsive verticalCenter" />
                                    </div>
                                    <p>
                                    No need register
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>

                    <div className={["row justify-content-md-center", styles.itemsRow].join(' ')}>
                        <div className="col-md-10 row justify-content-md-center">
                            <div className="col-md-7">
                                <article className={['row', styles.item].join(' ')}>
                                    <div className={[styles.itemImg, styles.itemImgBg5].join(' ')}>
                                        <img src="images/icons/real-time.png" alt="real time design" className="imgResponsive verticalCenter" />
                                    </div>
                                    <p>
                                    real time design
                                    </p>
                                </article>
                            </div>
                            <div className="col-md-5">
                                <article className={['row', styles.item].join(' ')}>
                                    <div className={[styles.itemImg, styles.itemImgBg6].join(' ')}>
                                        <img src="images/icons/github.png" alt="open source" className="imgResponsive verticalCenter" />
                                    </div>
                                    <p>
                                    It's open source
                                    </p>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={[styles.third].join(' ')}>
                    <h2>
                        How its work?
                    </h2>
                    <div className="row justify-content-md-center">
                        <article className={["col-md-6 row justify-content-md-center", styles.thirdVideo].join(' ')}>
                            <video loop poster="/images/resume-pic.jpg" controls>
                                <source src="video/resume.mp4" type="video/mp4" />
                                <source src="video/resume.webm" type="video/webm" />
                            </video>
                        </article>
                    </div>
                </section>

                <section className={[styles.forth].join(' ')}>
                    <p>
                    You can save your data and use in the future.
                    </p>
                    <p className={styles.bold}>
                    what do you think! its amazing?
                    </p>
                    <div className={styles.crBtn}>
                        <Link href="/resume-builder">
                        WTF! Show me how
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    )
}