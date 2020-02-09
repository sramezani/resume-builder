import { actionTypes } from './actionTypes';
import { AppAPI } from '../../lib';
import Util from '../../lib/Util';

export const updateUserData = (data) => {
    return {
        type : actionTypes.UPDATE_USER_DATA,
        payload: data
    }
}

export const updateTheme = (data) => {
    return {
        type : actionTypes.UPDATE_THEME,
        payload: data
    }
}

export const updateWorkExperience = (data) => {
    return {
        type : actionTypes.UPDATE_WORK_EXPERIENCE,
        payload: data
    }
}

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
        type : actionTypes.ADD_NEW_WORK_EXPERIENCE,
        payload: data
    }
}

export const updateWorkExperienceData = (id, data) => {
    return {
        type : actionTypes.UPDATE_WORK_EXPERIENCE_DATA,
        payloadId: id,
        payload: data
    }
}

export const deleteWorkExperienceData = (id) => {
    return {
        type : actionTypes.DELETE_WORK_EXPERIENCE_DATA,
        payload: id
    }
}

export const addEducation = () => {

    const id = Util.randomId();
    const data = {
            id,
            date: '',
            title: ''
        };

    return {
        type : actionTypes.ADD_NEW_EDUCATION,
        payload: data
    }
}

export const updateEducation = (data) => {
    return {
        type : actionTypes.UPDATE_EDUCATION,
        payload: data
    }
}

export const updateEducationData = (id, data) => {
    return {
        type : actionTypes.UPDATE_EDUCATION_DATA,
        payloadId: id,
        payload: data
    }
}

export const deleteEducationData = (id) => {
    return {
        type : actionTypes.DELETE_EDUCATION_DATA,
        payload: id
    }
}