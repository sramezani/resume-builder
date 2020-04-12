import React from 'react';

import { Toast, Util } from '@lib';
import { Text, Dnd } from '@component';

import { appStore } from '../../../../redux/store';
import { addEducation, updateEducation, deleteEducationData } from '../../../../redux/core/actions';

import styles from './education.module.scss';

class Education extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        // appStore.dispatch(addEducation());
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
                            customclass={styles.educationExplain}
                            placeholder="2010 - 2014"
                        />

                    </div>

                )}
            />

        )
     }
}

/* Export Component =============================== */
export default Education;