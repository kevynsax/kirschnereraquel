// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_mural_id_ from "./routes/api/mural/[id].ts";
import * as $api_mural_index from "./routes/api/mural/index.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $LocalCard from "./islands/LocalCard.tsx";
import * as $Mural from "./islands/Mural.tsx";
import * as $PostCard from "./islands/PostCard.tsx";
import * as $repo from "./islands/repo.ts";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/mural/[id].ts": $api_mural_id_,
    "./routes/api/mural/index.ts": $api_mural_index,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/LocalCard.tsx": $LocalCard,
    "./islands/Mural.tsx": $Mural,
    "./islands/PostCard.tsx": $PostCard,
    "./islands/repo.ts": $repo,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
