import fetch from 'node-fetch';
import qs from 'querystring';
import HttpsProxyAgent  from 'https-proxy-agent'


const proxyAgent = new HttpsProxyAgent('http://127.0.0.1:4780');

export class myHttp {
  static async post(url, data) {
    const result = await (
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    ).text();
    return result;
  }

  static async get(url, data, option={}) {
    data = qs.stringify(data);
    

    //local
    // option={agent: proxyAgent}
   
    if (data != '') {
      url = `${url}?${data}`;
    }

    const result = await (
      await fetch(url, {
        method: 'GET',
        ...option,
      })
    ).text();

    return JSON.parse(result);
  }
}
