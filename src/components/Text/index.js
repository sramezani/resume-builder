import React from 'react';
import PropTypes from 'prop-types';
import Util from '../../lib/Util';

import { appStore } from '../../redux/store';
import { updateUserData, updateWorkExperienceData } from '../../redux/core/actions';

import styles from './style.scss';

class Text extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    _onChange = (e) => {
        console.log(e);
    }

    _onBlur = (e) => {
        const { statename, stateid } = this.props;
        const storeComponents = statename.split('.');

        const data = {
            [storeComponents[1]]: e.textContent ? e.innerHTML : ''
        }

        if (storeComponents[0] === 'userData') {
            appStore.dispatch(updateUserData(data));
        }
        else if (storeComponents[0] === 'workExperience') {
            console.log(stateid)
            console.log(data)
            appStore.dispatch(updateWorkExperienceData(stateid, data));
        }
    }

    _findLink(str) {
        const regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
        return str.replace(regex, "<a href='$1'>$1</a>");
    }

    render(){

        let { value, customclass, tag } = this.props;
        const TagName = tag ? tag : 'p';
        return (
            <TagName
                contentEditable="true"
                suppressContentEditableWarning="true"
                // onInput={(e) => this._onChange(e.currentTarget.textContent)}
                onBlur={(e) => this._onBlur(e.currentTarget)}
                dangerouslySetInnerHTML={{ __html: value }}
                className={"contentEditableContainer " + customclass}
                {...this.props}
            />
            //     {this.props.value}
            // </p>
        )
     }
}


Text.propTypes = {
    value: PropTypes.string
};

Text.defaultProps = {
    value: ''
};

/* Export Component =============================== */
export default Text;