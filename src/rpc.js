import axios from 'axios';

class Rpc {
  constructor(hostname, session) {
    this._defaults = {
      jsonrpc: '2.0',
      method: 'call',
    };
    this.hostname = hostname;
    this.session = session;
  }

  /**
   * Create axios request
   *
   * @param {String} url
   * @param {Object} params
   *
   * @returns {Promise}
   */
  __jsonrpc(url, params) {
    let config = undefined;
    if (this.session) {
      config = {
        headers: {
          'Cookie': `session_id=${this.session}`
        }
      }
    }
    return axios.post(`${this.hostname}${url}`, {
      ...this._defaults,
      id: Math.floor(Math.random() * 1000 * 1000 * 1000),
      params,
    }, config);
  }

  /**
   * Create axios request
   *
   * @param {String} url
   * @param {Object} params
   *
   * @returns {Promise}
   */
  rpc(url, params) {
    return this.__jsonrpc(url, params);
  }
}

export default Rpc;
