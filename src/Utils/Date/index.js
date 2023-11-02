import { DateTime } from "luxon";

export function convertDateISO8601(date) {
    try {
        const dateTime = DateTime.fromISO(date, { zone: "utc" });
        const formattedDate = dateTime.toFormat("dd/MM/yyyy");

        return formattedDate;
    } catch (error) {
        console.error("Erro ao converter a data:", error);
        return null;
    }
}

export function convertISODateToSlashDateString(isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export function convertISODateToTraceDateString(isoDate) {
    const date = new Date(isoDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
