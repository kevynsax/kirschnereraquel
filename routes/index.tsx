import Counter from '../islands/Counter.tsx';
import LocalCard from '../islands/LocalCard.tsx';
import { FreshContext, PageProps } from "$fresh/server.ts";
import { listAllPosts, Post } from '../services/mural.ts';
import Mural from "../islands/Mural.tsx";
import { Gifts } from '../islands/Gifts.tsx';

export const handler = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const lst = await listAllPosts();

        return _ctx.render({posts: lst})
    }
}

interface Props{
    posts: Post[]
}

export default function Home(props: PageProps<Props>) {
    return (
        <div className="home">
            <div class="app-bar">
                <div class="logo">
                    <span>K</span>
                    <span>&</span>
                    <span>R</span>
                </div>

                <div class="menu">
                    <span data-label='Gifts'>Lista de presentes</span>
                    <span data-label='Mural'>Mural de recados</span>
                    <span data-label='Local'>Casamento</span>
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

            <LocalCard />
            <Mural posts={props.data.posts} />

            <Gifts />
        </div>
    );
}
