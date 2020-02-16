import React from 'react';


import { appStore } from '../../redux/store';
import { addDeletedWorkExperienceItem } from '../../redux/core/actions';

import styles from './style.scss';
  
const ToastUndo = ({ itemId, message, closeToast, data }) => {
    
    const deletedWkE = data.filter(({ id }) => id === itemId);
    const findIndex = data.findIndex(e => e.id === itemId);
    function handleClick(){
        appStore.dispatch(addDeletedWorkExperienceItem(deletedWkE));
        closeToast();
    }
  
    return (
      <div className="toastBox">
            <div className="toastMessage">
                {message}
            </div>
            <div className="toastUndoBtn" onClick={handleClick}>
                UNDO
            </div>
      </div>
    );
}

/* Export Component =============================== */
export default ToastUndo;