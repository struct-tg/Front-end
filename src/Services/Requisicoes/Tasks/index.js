import api from "../../api";

export async function getAllTasks(tokenJWT) {
    try {
        const result = await api.get('/task?page=1&status', {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        })
        const objData = result.data;
        const array = objData.data;
        return array;
    }
    catch (error) {
        console.log('O erro de captura: ', JSON.stringify(error));
        return [];
    }
}

export async function insertNewTask(objTask, tokenJWT) {
    try {
        await api.post('/task', objTask, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            },
        });
        return true;
    }
    catch (error) {
        console.log('O erro de insercao de nova task: ', JSON.stringify(error));
        return false;
    }
};

export async function getTaskById(idTask, tokenJWT) {
    try {
        const result = await api.get(`/task/${idTask}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        const objData = result.data;
        return objData;
    }
    catch (error) {
        console.log('O erro no get de uma task: ', error)
        return [];
    }
}

export async function updateTask(idTask, objData, tokenJWT) {
    try {
        await api.put(`/task/${idTask}`, objData, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    }
    catch (error) {
        console.log('O erro na edicao de uma task: ', error)
        return false;
    }
};

export async function deleteTask(idTask, tokenJWT) {
    try {
        await api.delete(`/task/${idTask}`, {
            headers: {
                Authorization: `Bearer ${tokenJWT}`
            }
        });
        return true;
    }
    catch (error) {
        console.log('O erro de deleçao de uma task: ', JSON.stringify(error));
        return false;
    }
};