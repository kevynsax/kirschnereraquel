import Counter from "../islands/Counter.tsx";
import { Button } from "../components/Button.tsx";

export default function Home() {
    return (
        <div className="home">
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
                    Raquel Rosa <br /> e <br /> Kirschner Klava
                </span>
            </div>

            <div class="cover">
                <img src="/cover.jpg" />
                <Counter />
            </div>

            <div className="place">
                <div class="card-place">
                    <div className="image-wrapper">
                        <img src="local.jpg" />
                    </div>

                    <div class="place-info">
                        <span class="title">Casamento</span>

                        <div className="wrap">
                            <div className="info">
                                <div className="icon">
                                    <img src="/date-icon.svg" />
                                </div>
                                <span>14 de dezembro de 2024 - 17h00</span>
                            </div>

                            <div className="info">
                                <div className="icon">
                                    <img src="/place-icon.svg" />
                                </div>
                                <span>
                                    Villa Bé - Ponte Alta Gama, Brasília - DF
                                </span>
                            </div>
                        </div>

                        <div className="actions">
                            <Button prefixImage='/place-icon.svg'>Maps</Button>
                            <Button prefixImage='/date-icon.svg'>Add Lembrete</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
