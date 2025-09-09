import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Link from 'next/link';
import styles from './style.module.scss';

export default function HeaderNavbar() {
    return (
        <Navbar expand="sm" className={styles.nav}>
            <div className="container">
                <Link href="/">
                    <img src="/images/logo1.png" alt="wtfresume logo (resume builder)" className={styles.logo} />
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarNav}>
                    <i className="material-icons">menu</i>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavItem className={styles.navItem}>
                            <Link href="/resume-builder">Create My Resume</Link>
                        </NavItem>

                        <NavItem className={styles.navItem}>EN</NavItem>

                        <NavItem className={styles.navItem}>
                            <Link href="https://github.com/sramezani/resume-builder">
                                <a target="_blank" rel="noopener noreferrer">
                                    github
                                </a>
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
