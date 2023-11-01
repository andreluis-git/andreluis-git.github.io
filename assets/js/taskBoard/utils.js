function padronizaString(texto) {
  return texto.toLowerCase().replace(/[^A-Z0-9]+/gi, "_");
}

const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const matchParentNode = (elemento, classe) => {
  let regx = new RegExp("^" + classe + "$");
  let node = elemento;

  while (!node.className.match(regx)) {
    node = node.parentNode;
  }
  return node;
};

const utils = {
  padronizaString,
  getLocalStorage,
  setLocalStorage,
  matchParentNode,
};

export default utils;
