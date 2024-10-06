import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import Icon from './components/Icon.vue';
import store from './store';

const app = createApp(App);
app.component('Icon', Icon);
app.use(store);
app.mount('#app');
