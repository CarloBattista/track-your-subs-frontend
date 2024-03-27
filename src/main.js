import { createApp } from 'vue'
import './css/style.css'
import App from './App.vue'

import router from './routing/router';
import authStore from './data/auth.js';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const app = createApp( App );
app.use( router );
app.use( authStore );
app.mount( '#app' );
