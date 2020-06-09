import React from 'react';

import { useDispatch } from "react-redux";

import { Toast, Util } from '@lib';

import { Text, Dnd2Column } from '@component';

import { addSkill, updateSkill, deleteSkillData } from '../../../../redux/core/actions';

// import styles from './skills.module.scss';

function Skills(props) {

    const dispatch = useDispatch();

    const _updateSkill = (data) => {
        const storeReorder = Util.mapOrder(props.data, data, 'id');
        dispatch(updateSkill(storeReorder));
    }

    const _addNewItem = () => {
        dispatch(addSkill());
    }

    const _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'skills', 'Skills Item Removed');
        dispatch(deleteSkillData(id));
    }

    let { data } = props;
    return (
        <Dnd2Column
            data={data}
            reorder={(e) => _updateSkill(e)}
            additem={_addNewItem}
            removeitem={(e) => _removeItem(e, data)}
            renderItem={(item) => (
                <div style={{ background: '#fff' }}>
                    <Text
                        value={item.title}
                        statename="skills.title"
                        stateid={item.id}
                        placeholder="React Native"
                    />
                </div>

            )}
        />

    )
}


/* Export Component =============================== */
export default Skills;