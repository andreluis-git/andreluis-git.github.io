function padronizaString(texto) {
  return texto.toLowerCase().replace(/[^A-Z0-9]+/gi, "_");
}

const utils = {
  padronizaString,
};

export default utils;
