export interface IProps {
    itemStatus: {
		// picture: boolean,
        // info: boolean,
        // profile: boolean,
        // workExperience: boolean,
        // education: boolean,
        // skills: boolean
        [key: string]: boolean
    },
    theme: {
        [key: string]: string
    }
}
export interface IState {
    colorPicker: boolean,
    bgComplete: boolean,
    background: string,
    checked: boolean,
    sectionStatus: boolean
}