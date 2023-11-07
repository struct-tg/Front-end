import api from "../../../api.js";
import { getAllDiscipline } from "../../Disciplines/index";

export async function getAllNamesDiscipline(tokenJWT) {
    try {
        const allDiscipline = await getAllDiscipline(tokenJWT)
        const allNameDiscipline = allDiscipline.map((item) => ({
            disciplineId: item.id,
            name: item.name,
        }));

        return allNameDiscipline;
    } catch (error) {
        console.log(error.response.data);
        return null;
    }
};

export async function getAllFilterDiscipline(tokenJWT, { status, partialName }) {
    let queryStatus = "";
    let queryPartialName = "";

    try {
        if (status) {
            queryStatus = `status=${status}`
        }
        if (partialName) {
            queryPartialName = `partialName=${partialName}`
        }

        const result = await api.get(`/discipline/?${queryStatus}&${queryPartialName}`, {
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
        console.log(error);
        return error;
    }
};