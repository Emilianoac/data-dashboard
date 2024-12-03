import VueApexCharts from "vue3-apexcharts";
import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);

app.use(VueApexCharts);
app.component("apex-chart", VueApexCharts);
app.use(createPinia());

app.mount("#app");
