import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';

import {configure} from 'axios-hooks';
import {cache} from '@fastly/cache';
import {http as axios} from '@fastly/services/http.service';
import {register} from 'timeago.js';
import {getDateLang} from '@fastly/utils/getDateLang';

register('es_PE', getDateLang);
configure({axios, cache});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
