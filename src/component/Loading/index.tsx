import React from 'react';

import styles from './style.module.scss';

interface TProps {
    show: boolean;
}

export default function Loading(props: TProps) {
    return props.show ? (
        <div className={styles.container}>
            <div className={['verticalCenter', styles.gif].join(' ')}>
                <img src="/images/pdf-generate.gif" alt="pdf generate animation" />
            </div>
        </div>
    ) : (
        <div />
    );
}
