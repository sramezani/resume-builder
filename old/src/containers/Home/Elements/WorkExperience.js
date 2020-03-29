import React from 'react';
import PropTypes from 'prop-types';

import Dnd from '../../../components/Dnd';
import Text from '../../../components/Text';
import Toast from '../../../lib/Toast';

import { appStore } from '../../../redux/store';
import { addNewWorkExperience, updateWorkExperience, deleteWorkExperienceData } from '../../../redux/core/actions';

import Util from '../../../lib/Util';
import styles from '../style.scss';

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
                    <div className="workBox">
                        <div className="leftWork">
                            <Text
                                value={item.date}
                                statename="workExperience.date"
                                stateid={item.id}
                                placeholder="May 2018 – May 2019"
                                customclass="workDate"
                                tag="div"
                            />
                        </div>
                        <div className="RightWork">
                            <div className="workDot" />
                            <Text
                                value={item.jobTitle}
                                statename="workExperience.jobTitle"
                                stateid={item.id}
                                placeholder="React Native Developer"
                                customclass="workTitle"
                                tag="div"
                            />
                            <Text
                                value={item.companyName}
                                statename="workExperience.companyName"
                                stateid={item.id}
                                placeholder="Facebook"
                                customclass="workCompany"
                                tag="div"
                            />
                            <Text
                                value={item.companyText}
                                statename="workExperience.companyText"
                                stateid={item.id}
                                customclass="companyExplain"
                                placeholder="Facebook, Inc. is an American social media and technology company based in Menlo Park, California."
                            />
                            <div className="experienceText">
                                <Text
                                    value={item.experienceText}
                                    statename="workExperience.experienceText"
                                    stateid={item.id}
                                    customclass="companyExplain"
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


WorkExperience.propTypes = {
    // value: PropTypes.string
};

WorkExperience.defaultProps = {
};

/* Export Component =============================== */
export default WorkExperience;