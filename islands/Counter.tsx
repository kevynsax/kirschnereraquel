import { effect, useSignal } from "@preact/signals";


const segundo = 1000;
const minuto = 1000 * 60;
const hora = 1000 * 60 * 60;
const dia = 1000 * 60 * 60 * 24;

const targetDate = new Date("2024-12-14T17:00:00").getTime();

export default function Counter() {
    const timeToTarget = useSignal(targetDate - new Date().getTime());
    effect(() => {
        const interval = setInterval(() => {
            timeToTarget.value = targetDate - new Date().getTime();
        }, 1000);

        return () => clearInterval(interval);
    })

    const days = Math.floor(timeToTarget.value/ dia);
    const hours = Math.floor(timeToTarget.value / hora % 24);
    const minutes = Math.floor(timeToTarget.value / minuto % 60);
    const seconds = Math.floor(timeToTarget.value / segundo % 60);

    const timings = [{
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
