import React, { useEffect, useState } from 'react';

import { appStore } from '../../redux/store';
import { updateUserData, updateWorkExperienceData, updateEducationData, updateSkillData } from '../../redux/core/actions';

import { Util } from '@lib'

import styles from './text.module.scss';

type DivProps = JSX.IntrinsicElements["p"];

interface IProps extends DivProps {
    statename: String,
    stateid: Number,
    value: any,
    customclass: any,
    tag: any,
    // children: React.ReactNode
}

const defaultProps: IProps = {
    statename: '',
    stateid: 1,
    value: '',
    customclass: '',
    tag: 'p',
}

function Text(props: IProps) {
    const [editable, setEditable] = useState(true);


    useEffect(() => {
        if (Util.editable()) {
            setEditable(true)
            return;
		}
		setEditable(false)
    }, []);


    // const _onChange = (e) => {
    //     console.log(e);
    // }

    const _onBlur = (e: any) => {
        const { statename, stateid } = props;
        const storeComponents = statename.split('.');

        const data = {
            [storeComponents[1]]: e.textContent ? e.innerHTML : ''
        }

        if (storeComponents[0] === 'userData') {
            appStore.dispatch(updateUserData(data));
        }
        else if (storeComponents[0] === 'workExperience') {
            appStore.dispatch(updateWorkExperienceData(stateid, data));
        }
        else if (storeComponents[0] === 'education') {
            appStore.dispatch(updateEducationData(stateid, data));
        }
        else if (storeComponents[0] === 'skills') {
            appStore.dispatch(updateSkillData(stateid, data));
        }
    }

    // const _findLink = (str) => {
    //     const regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
    //     return str.replace(regex, "<a href='$1'>$1</a>");
    // }


    let { value, customclass, tag } = props;
    const TagName = tag ? tag : 'p';
    return (
        <>
        <TagName
            contentEditable={editable}
            suppressContentEditableWarning="true"
            // onInput={(e) => this._onChange(e.currentTarget.textContent)}
            onBlur={(e: any) => _onBlur(e.currentTarget)}
            dangerouslySetInnerHTML={{ __html: value }}
            // className={"contentEditableContainer " + customclass}
            className={styles.contentEditableContainer + ' ' + customclass}
            {...props as any}
            // placeholder=""
        />
        </>
        //     {this.props.value}
        // </p>
    )
}

Text.defaultProps = defaultProps;

export default Text;