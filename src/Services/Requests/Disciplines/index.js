import api from "../../api";

export async function getDisciplineByID(tokenJWT, idDiscipline) {
    try {
        const result = await api.get(`/discipline/${idDiscipline}`, {
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

export async function getAllDiscipline(tokenJWT) {
    try {
        const result = await api.get(`/discipline`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })

        const objData = result.data;
        const array = objData.data;
        return array;
    } catch (error) {
        console.log(error.response.data);
        return [];
    }
};

export async function insertNewDiscipline(tokenJWT, objData) {
    try {
        await api.post('/discipline', objData, {
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

export async function updateDiscipline(tokenJWT, idDiscipline, objDiscipline) {
    try {
        await api.put(`/discipline/${idDiscipline}`, objDiscipline, {
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

export async function deleteDiscipline(idDiscipline, tokenJWT) {
    try {
        await api.delete(`/discipline/${parseInt(idDiscipline, 10)}`, {
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

export async function offDiscipline(idDiscipline, tokenJWT) {
    try {
        await api.patch(`/discipline/off/${idDiscipline}`, null, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }

        })
        return true;
    } catch (error) {
        console.log(error.response.data);
        return error;
    }
};