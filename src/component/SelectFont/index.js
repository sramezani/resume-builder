import React from 'react';

import styles from './select.module.scss';

import { appStore } from '../../redux/store';
import { updateTheme } from '../../redux/core/actions';

const fonts = ['Source Sans Pro', 'Josefin Sans', 'Calibri', 'Cambria', 'Garamond', 'Georgia'];

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: appStore.getState().theme.fontFamily,
        };
    }

    _onChange = (e) => {
        const value = e && e.target && e.target.value;
        const data = {
            fontFamily: value,
        };
        this.setState({ value });
        appStore.dispatch(updateTheme(data));
    };
    render() {
        return (
            <div className={styles.selectBoxForm}>
                <select value={this.state.value} onChange={(e) => this._onChange(e)} ref={(c) => (this.mySelect = c)}>
                    {fonts.map((item, index) => {
                        return (
                            <option value={item} key={index} style={{ fontFamily: item }}>
                                {item}
                            </option>
                        );
                    })}
                </select>
                <i className={'material-icons ' + styles.selectDown}>arrow_drop_down</i>
            </div>
        );
    }
}

// Select.propTypes = {
//     data: PropTypes.array,
//     label: PropTypes.string,
//     initial: PropTypes.number,
//     isRequired: PropTypes.bool
// };

// Select.defaultProps = {
//     data: [],
//     label: '',
//     initial: 0,
//     isRequired: false
// };

/* Export Component =============================== */
export default Select;
