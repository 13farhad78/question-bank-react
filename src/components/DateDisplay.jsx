import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function DateDisplay() {
    const date = new Date();
    const weekday = new Intl.DateTimeFormat("fa-IR", { weekday: "long" }).format(date);
    const day = new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(date);
    const month = new Intl.DateTimeFormat("fa-IR", { month: "long" }).format(date);
    const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(date);

    return <p className="font-sahel">{`${weekday}، ${day} ${month} ${year}`} <CalendarMonthIcon fontSize='small'/></p>
;

}