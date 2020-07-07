import { actionTypes } from './actionTypes';
import { AppAPI } from '../../lib';
import Util from '../../lib/Util';
import AppConfig from '../../constant/config';
import ApiConst from '../../constant/api';

import { appStore } from '../store';

export const updateUserData = (data) => {
    return {
        type: actionTypes.UPDATE_USER_DATA,
        payload: data,
    };
};

export const updateTheme = (data) => {
    return {
        type: actionTypes.UPDATE_THEME,
        payload: data,
    };
};

export const updateItemStatus = (data) => {
    return {
        type: actionTypes.UPDATE_ITEM_STATUS,
        payload: data,
    };
};

export const updateWorkExperience = (data) => {
    return {
        type: actionTypes.UPDATE_WORK_EXPERIENCE,
        payload: data,
    };
};

export const addNewWorkExperience = () => {
    const id = Util.randomId();
    const data = {
        id,
        date: '',
        jobTitle: '',
        companyName: '',
        companyText: '',
        experienceText: '',
    };

    return {
        type: actionTypes.ADD_NEW_WORK_EXPERIENCE,
        payload: data,
    };
};

export const updateWorkExperienceData = (id, data) => {
    return {
        type: actionTypes.UPDATE_WORK_EXPERIENCE_DATA,
        payloadId: id,
        payload: data,
    };
};

export const deleteWorkExperienceData = (id) => {
    return {
        type: actionTypes.DELETE_WORK_EXPERIENCE_DATA,
        payload: id,
    };
};

export const addDeletedWorkExperienceItem = (data) => {
    return {
        type: actionTypes.ADD_DELETED_WORK_EXPERIENCE_ITEM,
        payload: data,
    };
};

export const addEducation = () => {
    const id = Util.randomId();
    const data = {
        id,
        date: '',
        title: '',
    };

    return {
        type: actionTypes.ADD_NEW_EDUCATION,
        payload: data,
    };
};

export const updateEducation = (data) => {
    return {
        type: actionTypes.UPDATE_EDUCATION,
        payload: data,
    };
};

export const updateEducationData = (id, data) => {
    return {
        type: actionTypes.UPDATE_EDUCATION_DATA,
        payloadId: id,
        payload: data,
    };
};

export const deleteEducationData = (id) => {
    return {
        type: actionTypes.DELETE_EDUCATION_DATA,
        payload: id,
    };
};

export const addDeletedEducationItem = (data) => {
    return {
        type: actionTypes.ADD_DELETED_WORK_EDUCATION_ITEM,
        payload: data,
    };
};

export const addSkill = () => {
    const id = Util.randomId();
    const data = {
        id,
        title: '',
    };

    return {
        type: actionTypes.ADD_NEW_SKILL,
        payload: data,
    };
};

export const updateSkill = (data) => {
    return {
        type: actionTypes.UPDATE_SKILL,
        payload: data,
    };
};

export const updateSkillData = (id, data) => {
    return {
        type: actionTypes.UPDATE_SKILL_DATA,
        payloadId: id,
        payload: data,
    };
};

export const deleteSkillData = (id) => {
    return {
        type: actionTypes.DELETE_SKILL_DATA,
        payload: id,
    };
};

export const addDeletedSkillItem = (data) => {
    return {
        type: actionTypes.ADD_DELETED_WORK_SKILL_ITEM,
        payload: data,
    };
};

export const exportUserData = () => {
    return (dispatch, getState) => {
        const userData = getState().userData;
        const workExperience = getState().workExperience;
        const education = getState().education;
        const skills = getState().skills;
        const theme = getState().theme;
        const itemStatus = getState().itemStatus;

        let data = [];
        data = {
            userData,
            workExperience,
            education,
            skills,
            theme,
            itemStatus,
        };

        return data;
    };
};

export const importUserData = (data) => {
    // const obj = JSON.parse(data)
    const obj = data;

    appStore.dispatch(updateUserData(obj.userData));
    appStore.dispatch(updateWorkExperience(obj.workExperience));
    appStore.dispatch(updateEducation(obj.education));
    appStore.dispatch(updateSkill(obj.skills));
    appStore.dispatch(updateTheme(obj.theme));
    appStore.dispatch(updateItemStatus(obj.itemStatus));
};

export const uploadImageAction = (image) => {
    return () =>
        new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', image);
            fetch(ApiConst.imgurHostname, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Client-ID ${AppConfig.imgurClientId}`,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
};
