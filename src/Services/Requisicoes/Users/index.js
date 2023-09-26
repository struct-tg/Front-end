import api from "../../api";

export async function cadastraUsuario(objRegistro) {
    try {
        await api.post('/user', objRegistro);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export async function realizaLogin(objLogin) {
    try {
        const result = await api.post('/user/auth', objLogin);
        return result.data.token;
    }
    catch (error) {
        console.log(JSON.stringify(error));
        return false;
    }
};

export async function getUserName(tokenJWT) {
    try {
        const result = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })
        return result.data.name;
    } catch (error) {
        console.log(JSON.stringify(error));
        return null;
    }
};

export async function updateUser(tokenJWT, objData) {
    try {
        await api.put('/user', objData, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    } catch (error) {
        console.log(JSON.stringify(error));
        return null;
    }
};

export async function deleteUser(tokenJWT) {
    try {
        await api.delete('/user', {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })

        return true;
    } catch (error) {
        console.log(JSON.stringify(error));
        return false;
    }
};