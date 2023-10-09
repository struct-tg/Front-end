import api from "../../api";

export async function generateOTP(objData) {
    try {
        await api.post('/validation-otp', objData);
        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
};

export async function VerifyOTP(OTPCode) {
    try {
        await api.get(`/validation-otp/${OTPCode}`);
        return true;
    } catch (error) {
        console.log(error.response.data);
       return false;
    }
}

export async function ChangePassword(objData) {
    try {
        await api.post('/validation-otp/new-password', objData);
        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
}