import React from 'react';
import { useDispatch } from "react-redux";

import { Toast, Util } from '@lib';
import { Text, Dnd } from '@component';

import { addEducation, updateEducation, deleteEducationData } from '../../../../redux/core/actions';

import styles from './education.module.scss';

function Education (props){

    const dispatch = useDispatch();

    const _updateEducation = (data) => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateEducation(storeReorder));
    }

    const _addNewItem = () => {
        dispatch(addEducation());
    }

    const _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'education', 'Education Item Removed');
        dispatch(deleteEducationData(id));
    }

    let { data } = props;
    return (
        <Dnd
            data={data}
            reorder={(e) => _updateEducation(e)}
            additem={_addNewItem}
            removeitem={(e) => _removeItem(e, data)}
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

/* Export Component =============================== */
export default Education;