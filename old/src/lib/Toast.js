import React from 'react';
import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import ToastUndo from '../components/ToastUndo';

const config = {
    position: "bottom-left",
    autoClose: 7000,
    // hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Flip
}

const Toast = {

	showUndo: (id, data, type, message = 'item removed') => {
        toast.dismiss();
        toast(<ToastUndo itemId={id} data={data} message={message} type={type} />, config)
    },

	show: (message = '...') => {
        toast.dismiss();
        toast(message, config)
    },

	dismiss: () => {
        toast.dismiss()
    }

};

/* Export ================================ */
export default Toast;