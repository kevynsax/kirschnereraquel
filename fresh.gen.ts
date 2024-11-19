// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_donate_id_ from "./routes/api/donate/[id].ts";
import * as $api_donate_index from "./routes/api/donate/index.ts";
import * as $api_gift from "./routes/api/gift.ts";
import * as $api_mural_id_ from "./routes/api/mural/[id].ts";
import * as $api_mural_index from "./routes/api/mural/index.ts";
import * as $checkout_id_ from "./routes/checkout/[id].tsx";
import * as $donation_id_ from "./routes/donation/[id].tsx";
import * as $index from "./routes/index.tsx";
import * as $pix from "./routes/pix.tsx";
import * as $CheckoutBody from "./islands/CheckoutBody.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $DonationDetailed from "./islands/DonationDetailed.tsx";
import * as $GiftForm from "./islands/GiftForm.tsx";
import * as $Gifts from "./islands/Gifts.tsx";
import * as $LocalCard from "./islands/LocalCard.tsx";
import * as $Mural from "./islands/Mural.tsx";
import * as $PostCard from "./islands/PostCard.tsx";
import * as $repo from "./islands/repo.ts";
import * as $utils_AppBar from "./islands/utils/AppBar.tsx";
import * as $utils_Field from "./islands/utils/Field.tsx";
import * as $utils_FieldCardNumber from "./islands/utils/FieldCardNumber.tsx";
import * as $utils_FieldMasked from "./islands/utils/FieldMasked.tsx";
import * as $utils_FieldPhoneNumber from "./islands/utils/FieldPhoneNumber.tsx";
import * as $utils_FieldPrice from "./islands/utils/FieldPrice.tsx";
import * as $utils_Logo from "./islands/utils/Logo.tsx";
import * as $utils_QrCode from "./islands/utils/QrCode.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/donate/[id].ts": $api_donate_id_,
    "./routes/api/donate/index.ts": $api_donate_index,
    "./routes/api/gift.ts": $api_gift,
    "./routes/api/mural/[id].ts": $api_mural_id_,
    "./routes/api/mural/index.ts": $api_mural_index,
    "./routes/checkout/[id].tsx": $checkout_id_,
    "./routes/donation/[id].tsx": $donation_id_,
    "./routes/index.tsx": $index,
    "./routes/pix.tsx": $pix,
  },
  islands: {
    "./islands/CheckoutBody.tsx": $CheckoutBody,
    "./islands/Counter.tsx": $Counter,
    "./islands/DonationDetailed.tsx": $DonationDetailed,
    "./islands/GiftForm.tsx": $GiftForm,
    "./islands/Gifts.tsx": $Gifts,
    "./islands/LocalCard.tsx": $LocalCard,
    "./islands/Mural.tsx": $Mural,
    "./islands/PostCard.tsx": $PostCard,
    "./islands/repo.ts": $repo,
    "./islands/utils/AppBar.tsx": $utils_AppBar,
    "./islands/utils/Field.tsx": $utils_Field,
    "./islands/utils/FieldCardNumber.tsx": $utils_FieldCardNumber,
    "./islands/utils/FieldMasked.tsx": $utils_FieldMasked,
    "./islands/utils/FieldPhoneNumber.tsx": $utils_FieldPhoneNumber,
    "./islands/utils/FieldPrice.tsx": $utils_FieldPrice,
    "./islands/utils/Logo.tsx": $utils_Logo,
    "./islands/utils/QrCode.tsx": $utils_QrCode,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
