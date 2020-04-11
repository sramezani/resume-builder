import React from 'react';


// import styles from './two.module.scss';

import { IProps, IState } from "./two";

class Template extends React.Component<IProps, IState> {
    
    constructor(props: IProps) {
        super(props);

        this.state = {
        }

    }


    render(){
        return (
            <>
                <div>
                two
                </div>
            </>
        )
     }
}

/* Export Component =============================== */
export default Template;