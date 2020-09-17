import axios from 'axios';

export default class Ajax {

    /**
     * Perform a POST request
     *
     * @param {string} url  URL to send the POST request to
     * @param {object} data Data to be POSTed to the server with the request
     *
     * @returns {AxiosPromise}
     */
    static post(url, data) {
        return Ajax.request({
            method: 'post',
            url,
            data
        });
    }

    /**
     * Perform a GET request
     *
     * @param {string} url The URL to send the request to
     *
     * @returns {AxiosPromise}
     */
    static get(url) {
        return Ajax.request({
            method: 'get',
            url
        });
    }

    /**
     * Perform a simple request
     *
     * @param {object} options Options for the request, including, for example; type, url, data etc
     *
     * @returns {AxiosPromise}
     */
    static request(options) {
        return axios(options);
    }

}
