import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const PEXELS = {
    NEXT_PAGE: 'next_page',
    QUERY: 'query',
    TOTAL_RESULTS: 'total_results',
}

const TIMEZONES = {
    ARG: 'America/Argentina/Buenos_Aires',
} 

export const completarFecha = ( tiempo ) => {
    return new Date(`1970-01-01 ${tiempo}`);
}

export const getTimeZone = () => {    
    return 'America/Argentina/Buenos_Aires';
}

export const formatToLocalTime = ( fullDate ) => {
    return dayjs(fullDate).tz(TIMEZONES.ARG).format('HH:mm:ss');
}

