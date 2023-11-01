import api from "../../../api.js";

export default async function chartResume(tokenJWT) {
    try {
        const result = await api.get('/task/resume', {
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