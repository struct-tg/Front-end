import { getAllActivity } from "../../Activity/activity-service";

export async function getAllActivityExamination(tokenJWT) {
    try {
        const allActivity = await getAllActivity(tokenJWT);
        const allActivityExamination = allActivity.filter((activity) => activity.status == "EXAMINATION");

        return allActivityExamination;
    } catch (error) {
        console.log(error.response.data);
        return [];
    }
};

export async function getAllActivityActivity(tokenJWT) {
    try {
        const allActivity = await getAllActivityActivity(tokenJWT);
        const allActivityActivity = allActivity.filter((activity) => activity.status == "ACTIVITY");

        return allActivityActivity;
    } catch (error) {
        console.log(error.response.data);
        return [];
    }
};

export async function getAllActivityWork(tokenJWT) {
    try {
        const allActivity = await getAllActivity(tokenJWT);
        const allActivityWork = allActivity.filter((activity) => activity.status == "WORK");

        return allActivityWork;
    } catch (error) {
        console.log(error.response.data);
        return [];
    }
};

export async function getAllNamesActivity(tokenJWT) {
    try {
        const allActivity = await getAllActivity(tokenJWT)
        const allNameActivity = allActivity.map((item) => ({
            disciplineId: item.id,
            name: item.name,
        }));

        return allNameActivity;
    } catch (error) {
        console.log(error.response.data);
        return null;
    }
};
