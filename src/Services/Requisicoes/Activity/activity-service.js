import api from "../../api";

export async function insertNewActivity(tokenJWT, objData) {
    try {
        await api.post('/activity', objData, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })
        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
};

export async function getAllActivity(tokenJWT, disciplineId) {
    try {
        const result = await api.get(`/activity/findAll/${disciplineId}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })
        
        const objData = result.data;
        const array = objData.data;

        return array;
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
};

export async function getActivityByID(tokenJWT, DisciplineId, activityID) {
    try {
        const result = await api.get(`/discipline/${DisciplineId}/${activityID}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })

        const objData = result.data;
        return objData;
    } catch (error) {
        console.log(error.response.data);
        return {};
    }
};

export async function updateActivity(tokenJWT, idDiscipline, objActivity) {
    try {
        await api.put(`/discipline/${idDiscipline}`, objActivity, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });

        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
};

export async function deleteActivity(tokenJWT, DisciplineId, ActivityId) {
    console.log(typeof DisciplineId)
    try {
        await api.delete(`/discipline/${parseInt(DisciplineId, 10)}/${ActivityId}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }

        })
        return true;
    } catch (error) {
        console.log(error.response.data);
        return false;
    }
};