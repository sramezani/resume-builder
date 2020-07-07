import React from 'react';

import { appStore } from '../../redux/store';
import {
    updateUserData,
    updateWorkExperienceData,
    updateEducationData,
    updateSkillData,
} from '../../redux/core/actions';

import { Util } from '@lib';

import styles from './text.module.scss';

class Text extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editable: true,
        };
    }

    componentDidMount() {
        if (Util.editable()) {
            this.setState({ editable: true });
            return;
        }
        this.setState({ editable: false });
    }

    _onChange = (e) => {
        console.log(e);
    };

    _onBlur = (e) => {
        const { statename, stateid } = this.props;
        const storeComponents = statename.split('.');

        const data = {
            [storeComponents[1]]: e.textContent ? e.innerHTML : '',
        };

        if (storeComponents[0] === 'userData') {
            appStore.dispatch(updateUserData(data));
        } else if (storeComponents[0] === 'workExperience') {
            appStore.dispatch(updateWorkExperienceData(stateid, data));
        } else if (storeComponents[0] === 'education') {
            appStore.dispatch(updateEducationData(stateid, data));
        } else if (storeComponents[0] === 'skills') {
            appStore.dispatch(updateSkillData(stateid, data));
        }
    };

    _findLink(str) {
        const regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi;
        return str.replace(regex, "<a href='$1'>$1</a>");
    }

    render() {
        const { value, customclass, tag } = this.props;
        const TagName = tag ? tag : 'p';
        return (
            <>
                <TagName
                    contentEditable={this.state.editable}
                    suppressContentEditableWarning="true"
                    // onInput={(e) => this._onChange(e.currentTarget.textContent)}
                    onBlur={(e) => this._onBlur(e.currentTarget)}
                    dangerouslySetInnerHTML={{ __html: value }}
                    // className={"contentEditableContainer " + customclass}
                    className={
                        styles.contentEditableContainer + ' ' + customclass
                    }
                    {...this.props}
                    // placeholder=""
                />
            </>
            //     {this.props.value}
            // </p>
        );
    }
}

/* Export Component =============================== */
export default Text;
