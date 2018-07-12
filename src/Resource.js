import axios from 'axios';

axios.defaults.baseURL = '/prohibit';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.transformRequest = function (obj) {
    var str = []
    for (var p in obj) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
    return str.join("&")
};

export default {
    get: function (url, params) {
        params = params || {};
        params.time = Date.now()
        return axios.get(url, {
            params: params
        });
    },
    post: function (url, data) {
        return axios.post(url, data);
    }
}