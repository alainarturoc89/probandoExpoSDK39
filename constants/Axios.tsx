import axios from 'axios';

const baseURL = 'http://localhost:3000/';
const readUrl = (url = '') => url.startsWith('http://') || url.startsWith('https://') ? url : `${baseURL}/${url}`

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['authentication-token'] = "AUTH_TOKEN";
axios.defaults.headers.common['Accept'] = "application/json";

let qs = require('qs');
const api = axios.create();

const get = (url = '', data = {}) => api({
    url: readUrl(baseURL + url),
    params: qs.stringify(data)
})

const post = (url = '', data = {}) => api({
    method: 'post',
    url: readUrl(baseURL + url),
    data: qs.stringify(data)
});

const put = (url = '', data = {}) => api({
    method: 'put',
    url: readUrl(baseURL + url),
    data: qs.stringify(data)
});

const del = (url = '', data = {}) => api({
    method: 'delete',
    url: readUrl(baseURL + url),
    data: qs.stringify(data)
});

export default { get, post, put, delete: del, baseURL }