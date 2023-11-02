import api from "../../api.js";

export async function getAllActivity(tokenJWT, disciplineID) {
    try {
        const result = await api.get(`/activity/findAll/:${disciplineID}?page=1&limit=10`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        })
        const objData = result.data;
        const array = objData.data;
        return array;
    }
    catch (error) {
        console.log('Erro ao capturar todas as atividades avaliativas ', JSON.stringify(error));
        return [];
    }
};

export async function getActivityById(tokenJWT, disciplineID, activityID) {
    try {
        const result = await api.get(`/activity/${disciplineID}/${activityID}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        })
        const objData = result.data;
        const array = objData.data;
        return array;
    }
    catch (error) {
        console.log('O erro da atividade por id: ', JSON.stringify(error));
        return [];
    }
};

export async function createActivity(tokenJWT, objActivity) {
    try {
        await api.post('/activity', objActivity, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            },
        });
        return true;
    }
    catch (error) {
        console.log('O erro de insercao de nova atividade: ', JSON.stringify(error));
        return false;
    }
};

/*export async function deleteActivity(tokenJWT, disciplineID, activityID) {

};

export async function updateActivity(tokenJWT, activityID) {

};
*/
