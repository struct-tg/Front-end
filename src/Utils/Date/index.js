import { DateTime } from "luxon";

export default function convertDateISO8601(date) {
    try {
        const dateTime = DateTime.fromISO(date, { zone: "utc" });
        const formattedDate = dateTime.toFormat("yyyy-MM-dd");

        return formattedDate;
    } catch (error) {
        console.error("Erro ao converter a data:", error);
        return null;
    }
}