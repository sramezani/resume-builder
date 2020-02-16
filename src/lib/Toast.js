import { toast, Slide, Zoom, Flip, Bounce } from 'react-toastify';

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

	show: (message = '...') => {
        return (
            toast(message, config)
        )
    },

	dismiss: () => {
        toast.dismiss()
    }

};

/* Export ================================ */
export default Toast;