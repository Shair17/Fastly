import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import { BASE_URL as baseURL } from './constants/api';

const axios = Axios.create({
	baseURL,
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
