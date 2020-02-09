import React from 'react';
import PropTypes from 'prop-types';

import Dnd from '../../../components/Dnd';
import Text from '../../../components/Text';

import { appStore } from '../../../redux/store';
import { addEducation, updateEducation, deleteEducationData } from '../../../redux/core/actions';

import Util from '../../../lib/Util';
import styles from '../style.scss';

class Education extends React.Component{
    
    constructor(props) {
        super(props);

        this.state = {
            lamp: [{id: '1'}]
        }
    }

    componentDidMount() {
        appStore.dispatch(addEducation());
    }

    _mapOrder = (array, order, key) => {
        let arr = [];
        order.map((item) => arr.push(item.id));
        array.sort((a, b) => {
            let A = a[key], B = b[key];
        
            if (arr.indexOf(A) > arr.indexOf(B)) {
                return 1;
            } else {
                return -1;
            }
        
        });
        
        return array;
    }

    _updateEducation(data) {
        const storeReorder = this._mapOrder(this.props.data, data, 'id');
        appStore.dispatch(updateEducation(storeReorder));
    }

    _addNewItem = () => {
        appStore.dispatch(addEducation());
    }

    _removeItem = (id) => {
        appStore.dispatch(deleteEducationData(id));
    }

    render(){
        let { data } = this.props;
        return (
            <Dnd
                data={data}
                reorder={(e) => this._updateEducation(e)}
                additem={this._addNewItem}
                removeitem={(e) => this._removeItem(e)}
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