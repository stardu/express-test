"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let config;
const urlDev = '/xx';
const urlPro = 'http://smarty-api.adxing.xin';
const urlTest = 'http:39.106.93.134';
let urlOfWeb = window.location.host;
if (urlOfWeb == 'localhost:8200') {
    config = {
        // baseURL: process.env.baseURL || process.env.apiUrl || ""
        // timeout: 60 * 1000, // Timeout
        // withCredentials: true, // Check cross-site Access-Control
        baseURL: "/xx"
    };
}
if (urlOfWeb == '39.106.93.134') {
    config = {
        // baseURL: process.env.baseURL || process.env.apiUrl || ""
        // timeout: 60 * 1000, // Timeout
        // withCredentials: true, // Check cross-site Access-Control
        baseURL: "http:39.106.93.134"
    };
}
if (urlOfWeb == 'smarty.adxing.xin') {
    axios.defaults.baseURL = urlPro;
}



const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        if (response.data.err_code == '401') {
            router.push('/');
        }
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);


Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;

/* export function post(url, data = {}) {
    return _axios({
        url: url,
        method: 'post',
        data: data
    })
}

export function get(url) {
    return _axios({
        url: url,
        method: 'get',
    })
} */