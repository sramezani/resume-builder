export interface TProps {
    itemStatus: {
        // picture: boolean,
        // info: boolean,
        // profile: boolean,
        // workExperience: boolean,
        // education: boolean,
        // skills: boolean
        [key: string]: boolean;
    };
    theme: {
        [key: string]: string;
    };
    userData: {
        [key: string]: string;
    };
}

export interface TState {
    colorPicker: boolean;
    bgComplete: boolean;
    checked: boolean;
    sectionStatus: boolean;
    colorStatus: boolean;
    typoStatus: boolean;
    saveModal: boolean;
    loadModal: boolean;
    uploadErrMsg: boolean;
    gifGenerateStatus: boolean;
}
