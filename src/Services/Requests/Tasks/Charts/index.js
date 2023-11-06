import api from "../../../api.js";

export default async function chartResume(tokenJWT, dateStart, dateEnd) {
    try {
        const result = await api.get(`/task/resume?dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        })

        const objData = result.data;
        return objData;
    } catch (error) {
        console.log('Erro de captura de dados no gráfico', JSON.stringify(error));
        return [];
    }
};