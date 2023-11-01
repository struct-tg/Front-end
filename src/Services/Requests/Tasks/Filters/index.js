import { getAllTasks } from "../index";
import convertDateISO8601 from "../../../../Utils/Date/index";

export async function getAllTasksFinisheds(tokenJWT) {
    try {
        const allTasks = await getAllTasks(tokenJWT)
        allFinisheds = allTasks.filter((item) => item.dateEnd !== null);
        return allFinisheds;
    } catch (error) {
        console.log('Erro na captura das tasks finalizadas: ', JSON.stringify(error))
        return [];
    }
}

export async function getAllTasksPendings(tokenJWT) {
    try {
        const allTasks = await getAllTasks(tokenJWT)
        allPendings = allTasks.filter((item) => item.dateEnd === null);
        return allPendings;
    } catch (error) {
        console.log('Erro na captura das tasks pendentes: ', JSON.stringify(error))
        return [];
    }
}

export async function getAllTasksLates(tokenJWT) {
    try {
        const allTasks = await getAllTasks(tokenJWT)
        allLates = allTasks.filter((item) => convertDateISO8601(item.dateEnd) > convertDateISO8601(item.dateWishEnd));
        return allLates;
    } catch (error) {
        console.log('Erro na captura das tasks pendentes: ', JSON.stringify(error))
        return [];
    }
}