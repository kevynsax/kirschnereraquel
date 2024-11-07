import Counter from '../islands/Counter.tsx';
import LocalCard from '../islands/LocalCard.tsx';
import { listAllPosts, Post } from '../services/mural.ts';
import { Handlers } from '$fresh/server.ts';

interface HomeProps {
    posts: Post[]
}

export const handler: Handlers = {
    GET: async (req, ctx) => {
        const posts = await listAllPosts();

        console.log('isso aqui foi chamado', posts)

        return ctx.render({ posts })
    }
}

export default function Home(props: HomeProps) {
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

            {props.posts}
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
