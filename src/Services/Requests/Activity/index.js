import api from "../../api.js";

export async function getAllActivity(tokenJWT, disciplineID) {
    try {
        const result = await api.get(`/activity/findAll/${disciplineID}`, {
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
        return objData;
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

export async function deleteActivity(tokenJWT, disciplineID, activityID) {
    try {
        await api.delete(`activity/${disciplineID}/${activityID}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    }
    catch (error) {
        console.log('O erro de deleçao de uma atividade: ', JSON.stringify(error));
        return false;
    }
};

export async function updateActivity(tokenJWT, activityID, objData) {
    try {
        await api.put(`/activity/${activityID}`, objData, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    } catch (error) {
        console.log('O erro na edicao de uma atividade: ', JSON.stringify(error));
        return false;
    }
};

export async function getAllFiltersActivities(tokenJWT, disciplineID, { typeAc, partialName, }) {
    let queryType = "";
    let queryPartialName = "";

    try {
        if (typeAc) {
            queryType = `typeAc=${typeAc}`
        }
        if (partialName) {
            queryPartialName = `&partialName=${partialName}`
        }

        const result = await api.get(`/activity/findAll/${disciplineID}?${queryType}${queryPartialName}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        }).then(datas => {
            return datas;
        })

        const objData = result.data;
        const array = objData.data;

        return array;
    } catch (error) {
        console.log('erro na captura dos filtros de atividades avaliativas', JSON.stringify(error));
        return false;
    }
}