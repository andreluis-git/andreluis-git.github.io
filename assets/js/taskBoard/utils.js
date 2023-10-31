function padronizaString(texto) {
  return texto.toLowerCase().replace(/[^A-Z0-9]+/gi, "_");
}

const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const utils = {
  padronizaString,
  getLocalStorage,
  setLocalStorage,
};

export default utils;
