import api from "../../api";

export async function createPomodoro(objPomodoro, tokenJWT) {
    try {
        await api.post('/pomodoro', objPomodoro, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    } catch (error) {
        console.log('ERRO NA CRIACAO DE POMODORO', JSON.stringify(error.response.data));
        return false;
    }
}

export async function getAllPomodoro(tokenJWT) {
    try {
        const result = await api.get('/pomodoro', {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        const objData = result.data;
        const objRetorno = objData.data;

        return objRetorno[0];
    } catch (error) {
        console.log('ERRO NA CAPTURA DE TODOS POMODOROS POR USUARIO');
        return [];
    }
}

export async function getPomodoroByID(idPomodoro, tokenJWT) {
    try {
        await api.get(`/pomodoro/${idPomodoro}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    } catch (error) {
        console.log('ERRO NA CAPTURA DO POMODORO');
        return false;
    }
}