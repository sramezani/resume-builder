export interface TProps {
    theme: {
        color: string;
        fontFamily: string;
    };
    userData: {
        name: string;
        infoTitle: string;
        address: string;
        email: string;
        mobile: string;
        userData: string;
        profileTitle: string;
        profile: string;
        workExperienceTitle: string;
        educationTitle: string;
        skillsTitle: string;
    };
    workExperience: [];
    education: [];
    skills: [];
    itemStatus: {
        [key: string]: boolean;
    };
}
