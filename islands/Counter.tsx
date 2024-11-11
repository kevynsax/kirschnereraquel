import { effect, useSignal } from "@preact/signals";

const segundo = 1000;
const minuto = 1000 * 60;
const hora = 1000 * 60 * 60;
const dia = 1000 * 60 * 60 * 24;

interface NameValue {
    name: string;
    value: number;
}

const targetDate = new Date("2024-12-14T16:30:00").getTime();

const getTimings = (timeToTarget: number): NameValue[] => {
    const days = Math.floor(timeToTarget/ dia);
    const hours = Math.floor(timeToTarget / hora % 24);
    const minutes = Math.floor(timeToTarget / minuto % 60);
    const seconds = Math.floor(timeToTarget / segundo % 60);

    const timings: NameValue[] = [{
        name: "dias",
        value: days,
    }, {
        name: "horas",
        value: hours,
    }, {
        name: "minutos",
        value: minutes,
    }, {
        name: "segundos",
        value: seconds,
    }];

    if(days > 0)
        return timings;

    if(hours > 0)
        return timings.slice(1);

    if(minutes > 0)
        return timings.slice(2);

    if(seconds > 0)
        return timings.slice(3);

    return [];
}

export default function Counter() {
    const timeToTarget = useSignal(targetDate - new Date().getTime());
    effect(() => {
        const interval = setInterval(() => {
            timeToTarget.value = targetDate - new Date().getTime();
        }, 1000);

        return () => clearInterval(interval);
    })

    const timings = getTimings(timeToTarget.value);

    return (
        <div
            className="timings"
            onClick={() =>
                timeToTarget.value = targetDate - new Date().getTime()}
        >
            {timings.map((timing) => (
                <div className="timing">
                    <div className="value">{timing.value}</div>
                    <div className="name">{timing.name}</div>
                </div>
            ))}
        </div>
    );
}
