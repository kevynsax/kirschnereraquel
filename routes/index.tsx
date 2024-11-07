import { useSignal } from "@preact/signals";

export default function Home() {
    const count = useSignal(3);

    const targetDate = new Date("2024-12-14T17:00:00").getTime();
    const days = Math.floor(
        (targetDate - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );
    const hours = Math.floor(
        (targetDate - new Date().getTime()) / (1000 * 60 * 60) % 24,
    );
    const minutes = Math.floor(
        (targetDate - new Date().getTime()) / (1000 * 60) % 60,
    );
    const seconds = Math.floor((targetDate - new Date().getTime()) / 1000 % 60);

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
        <>
            <div class="app-bar">
                <div class="logo">
                    <span>K</span>
                    <span>&</span>
                    <span>R</span>
                </div>

                <div class="menu">
                    <span>Lista de presentes</span>
                    <span>Mural de recados</span>
                    <span>Casamento</span>
                </div>
            </div>
            <div class="banner">
                <div class="date">14.12.24</div>

                <span class="name">
                    Raquel Vasconcelos <br /> e <br /> Kirschner Klava
                </span>
            </div>

            <div class="cover">
                <img src="/cover.jpg" />

                <div class="timings">
                    {timings.map((timing) => (
                        <div class="timing">
                            <div class="value">{timing.value}</div>
                            <div class="name">{timing.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
        // <div class="px-4 py-8 mx-auto bg-[#86efac]">
        //   <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        //     <img
        //       class="my-6"
        //       src="/logo.svg"
        //       width="128"
        //       height="128"
        //       alt="the Fresh logo: a sliced lemon dripping with juice"
        //     />
        //     <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        //     <p class="my-4">
        //       Try updating this message in the
        //       <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        //     </p>
        //     <Counter count={count} />
        //   </div>
        // </div>
    );
}
