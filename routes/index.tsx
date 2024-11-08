import Counter from '../islands/Counter.tsx';
import LocalCard from '../islands/LocalCard.tsx';
import { Posts } from '../islands/Posts.tsx';

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

            <LocalCard/>
            <Posts />
        </div>
    );
}
