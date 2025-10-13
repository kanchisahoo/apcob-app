import axios from "./axiosFile";
// Wrapper Functionsexport
export function getWrapper(url: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(url);
      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}
export function postWrapper(url:any, data:any) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(url, data);
      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}
export function putWrapper(url:any, data:any) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(url, data);
      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}
export function deleteWrapper(url:any) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(url);
      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}

export function patchWrapper(url:any, data:any) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(url, data);
      return resolve(res.data);
    } catch (e) {
      return reject(e);
    }
  });
}


