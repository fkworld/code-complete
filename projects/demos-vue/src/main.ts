import { createPinia } from "pinia";
import { createApp } from "vue";

import { App } from "./app/app";
import { router } from "./router/router";

import "./main.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
