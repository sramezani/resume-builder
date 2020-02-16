import React from 'react';
import PropTypes from 'prop-types';

import Dnd from '../../../components/Dnd';
import Text from '../../../components/Text';
import Toast from '../../../lib/Toast';

import { appStore } from '../../../redux/store';
import { addEducation, updateEducation, deleteEducationData } from '../../../redux/core/actions';

import Util from '../../../lib/Util';
import styles from '../style.scss';

class Education extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        appStore.dispatch(addEducation());
    }

    _updateEducation(data) {
        const storeReorder = Util.mapOrder(this.props.data, data, 'id');
        appStore.dispatch(updateEducation(storeReorder));
    }

    _addNewItem = () => {
        appStore.dispatch(addEducation());
    }

    _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'education', 'Education Item Removed');
        appStore.dispatch(deleteEducationData(id));
    }

    render(){
        let { data } = this.props;
        return (
            <Dnd
                data={data}
                reorder={(e) => this._updateEducation(e)}
                additem={this._addNewItem}
                removeitem={(e) => this._removeItem(e, data)}
                renderItem={(item) => (
                    <div style={{ background: '#fff' }}>
                        <Text
                            value={item.title}
                            statename="education.title"
                            stateid={item.id}
                            placeholder="BSc. Software Engineering Harvard"
                        />
                        <Text
                            value={item.date}
                            statename="education.date"
                            stateid={item.id}
                            customclass="educationExplain"
                            placeholder="2010 - 2014"
                        />

                    </div>

                )}
            />

        )
     }
}


Education.propTypes = {
    // value: PropTypes.string
};

Education.defaultProps = {
};

/* Export Component =============================== */
export default Education;