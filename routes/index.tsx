import Counter from '../islands/Counter.tsx';
import LocalCard from '../islands/LocalCard.tsx';
import { FreshContext, PageProps } from "$fresh/server.ts";
import { listAllPosts, Post } from '../services/mural.ts';
import Mural from "../islands/Mural.tsx";
import { Gifts } from '../islands/Gifts.tsx';
import App from './_app.tsx';
import { AppBar } from '../components/AppBar.tsx';
import { Gift, listAllGifts } from '../services/gifts.ts';

export const handler = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const posts = await listAllPosts();
        const products = await listAllGifts();

        return _ctx.render({posts, products})
    }
}

interface Props{
    posts: Post[],
    products: Gift[]
}

export default function Home(props: PageProps<Props>) {
    return (
        <div className="home">
            <AppBar />
            <div class="banner">
                <div class="date">14.12.24</div>

                <span class="name">
                    Raquel <br /> e <br /> Kirschner
                </span>
            </div>

            <div class="cover">
                <img src="/cover.jpg" />
                <Counter />
            </div>

            <LocalCard />
            <Mural posts={props.data.posts} />

            <Gifts products={props.data.products} />
        </div>
    );
}
