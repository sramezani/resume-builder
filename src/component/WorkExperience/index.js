import React from 'react';

// import Dnd from '../../../components/Dnd';
// import Text from '../../../components/Text';
import Toast from '../../lib/Toast';

import { Text, Dnd } from '@component';

import { appStore } from '../../redux/store';
import { addNewWorkExperience, updateWorkExperience, deleteWorkExperienceData } from '../../redux/core/actions';

import Util from '../../lib/Util';
import styles from './experience.module.scss';

class WorkExperience extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        appStore.dispatch(addNewWorkExperience());
    }

    _updateWorkExperience(data) {
        const storeReorder = Util.mapOrder(this.props.data, data, 'id');
        appStore.dispatch(updateWorkExperience(storeReorder));
    }

    _addNewItem = () => {
        appStore.dispatch(addNewWorkExperience());
    }

    _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'workExperience', 'Work Item Removed');
        appStore.dispatch(deleteWorkExperienceData(id));
    }

    render(){
        let { data } = this.props;
        return (
            <Dnd
                data={data}
                reorder={(e) => this._updateWorkExperience(e)}
                additem={this._addNewItem}
                removeitem={(e) => this._removeItem(e, data)}
                renderItem={(item) => (
                    <div className={styles.workBox}>
                        <div className={styles.leftWork}>
                            <Text
                                value={item.date}
                                statename="workExperience.date"
                                stateid={item.id}
                                placeholder="May 2018 – May 2019"
                                customclass={styles.workDate}
                                tag="div"
                            />
                        </div>
                        <div className={styles.RightWork}>
                            <div className={styles.workDot} />
                            <Text
                                value={item.jobTitle}
                                statename="workExperience.jobTitle"
                                stateid={item.id}
                                placeholder="React Native Developer"
                                customclass={styles.workTitle}
                                tag="div"
                            />
                            <Text
                                value={item.companyName}
                                statename="workExperience.companyName"
                                stateid={item.id}
                                placeholder="Facebook"
                                customclass={styles.workCompany}
                                tag="div"
                            />
                            <Text
                                value={item.companyText}
                                statename="workExperience.companyText"
                                stateid={item.id}
                                customclass={styles.companyExplain}
                                placeholder="Facebook, Inc. is an American social media and technology company based in Menlo Park, California."
                            />
                            <div className={styles.experienceText}>
                                <Text
                                    value={item.experienceText}
                                    statename="workExperience.experienceText"
                                    stateid={item.id}
                                    customclass={styles.companyExplain}
                                    placeholder="- your experience..."
                                    
                                />
                            </div>
                        </div>
                    </div>
                )}
            />

        )
     }
}

/* Export Component =============================== */
export default WorkExperience;