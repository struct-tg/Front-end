import api from "../../api";

export async function cadastraUsuario(objRegistro) {
    try {
        await api.post('/user', objRegistro);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function realizaLogin(objLogin) {
    try {
        const result = await api.post('/user/auth', objLogin);
        return result.data.token;
    }
    catch (error) {
        console.log(JSON.stringify(error));
        return false;
    }
}