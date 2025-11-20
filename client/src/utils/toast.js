const _ = {};
import { toast, Bounce } from 'react-toastify';

_.signupdata = () => {
    return [{
        id: 1,
        name: "email",
        required: true,
    },
    {
        id: 2,
        name: "fullname",
        required: false
    },
    {
        id: 3,
        name: "password",
        required: true
    }
    ]
};
_.SuccessToast = (msg = "Success") => {
    toast.success(msg, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
_.ErrorToast = (msg = "Error") => {
    toast.error(msg, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
_.InfoToast = (msg) => {
    toast.info(msg, {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}

export default _;