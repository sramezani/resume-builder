import React from 'react';

import { Toast, Util } from '@lib';

import { Text, Dnd2Column } from '@component';

import { appStore } from '../../../../redux/store';
import { addSkill, updateSkill, deleteSkillData } from '../../../../redux/core/actions';

// import styles from './skills.module.scss';

class Skills extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        appStore.dispatch(addSkill());
    }

    _updateSkill(data) {
        const storeReorder = Util.mapOrder(this.props.data, data, 'id');
        appStore.dispatch(updateSkill(storeReorder));
    }

    _addNewItem = () => {
        appStore.dispatch(addSkill());
    }

    _removeItem = (id, data) => {
        Toast.showUndo(id, data, 'skills', 'Skills Item Removed');
        appStore.dispatch(deleteSkillData(id));
    }

    render(){
        let { data } = this.props;
        return (
            <Dnd2Column
                data={data}
                reorder={(e) => this._updateSkill(e)}
                additem={this._addNewItem}
                removeitem={(e) => this._removeItem(e, data)}
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
}


/* Export Component =============================== */
export default Skills;