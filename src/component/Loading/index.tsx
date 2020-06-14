import React from 'react';

import styles from './style.module.scss';

interface IProps {
	show: Boolean
}

export default function Loading(props: IProps) {

    return (
        props.show &&
            <div className={styles.container}>
                <div className={["verticalCenter", styles.gif].join(' ')}>
                    <img src="/images/pdf-generate.gif" alt="pdf generate animation" />
                </div>
            </div>
    );
}
