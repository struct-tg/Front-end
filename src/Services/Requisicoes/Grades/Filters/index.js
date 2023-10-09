import { getAllDiscipline } from "../../Grades/index";

export async function getAllDisciplineReproved(tokenJWT) {
    try {
        const allDiscipline = await getAllDiscipline(tokenJWT);
        const allDisciplineReproved = allDiscipline.filter((discipline) => discipline.status == "DISAPPROVED");

        return allDisciplineReproved;
    } catch (error) {
        console.log(error.response.data);
        return [];
    }
};

export async function getAllDisciplineApproved(tokenJWT) {
    try {
        const allDiscipline = await getAllDiscipline(tokenJWT);
        const allDisciplineApproved = allDiscipline.filter((discipline) => discipline.status != "DISAPPROVED");

        return allDisciplineApproved;
    } catch (error) {
        console.log(error.response.data);
        return [];
    }
};

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