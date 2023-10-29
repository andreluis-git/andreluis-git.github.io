import { default as data } from "../assets/data.json" assert { type: "json" };
import utils from "./utils.js";

function carregarDados() {
  window.localStorage.setItem("listaTarefas", JSON.stringify(data));
  const listaTarefas = JSON.parse(window.localStorage.getItem("listaTarefas"));

  const column = document.getElementById("addColumn");

  if (listaTarefas) {
    while (column.parentNode.childElementCount > 1) {
      column.parentNode.removeChild(column.parentNode.firstChild);
    }

    if (listaTarefas.colunas) {
      listaTarefas.colunas.forEach((coluna, idx) => {
        let novaColuna = criarNovaColuna(coluna);
        let dropzone = novaColuna.querySelector(".dropzone");
        coluna.cards.forEach((card, idx) => {
          const novoCard = criarNovoCard(card, idx);
          dropzone.appendChild(novoCard);
        });

        column.parentNode.insertBefore(novaColuna, column);
      });
    }
  }
}

function criarNovaColuna(coluna) {
  let novaColuna = document.createElement("div");
  novaColuna.className = "column";
  let nomeColuna = document.createElement("h2");
  nomeColuna.textContent = coluna.nomeColuna;
  let dropzone = document.createElement("div");
  dropzone.setAttribute("id", utils.padronizaString(coluna.nomeColuna));
  dropzone.className = "dropzone";
  let botao = document.createElement("a");
  botao.innerHTML = "Adicionar cartão";
  botao.href = "#";
  botao.className = "btnAddCard btn";
  botao.id = utils.padronizaString(coluna.nomeColuna + "_add");

  novaColuna.appendChild(nomeColuna);
  novaColuna.appendChild(dropzone);
  novaColuna.appendChild(botao);

  return novaColuna;
}

function criarNovoCard(card, idx) {
  let newElement = document.createElement("div");
  newElement.className = "card";
  newElement.setAttribute("draggable", "true");
  if (card.img) {
    let img = document.createElement("img");
    img.src = card.img;
    newElement.appendChild(img);
  }

  let titulo = document.createElement("h3");
  titulo.textContent = card.tituloCard + ` ${idx}`;
  let descricao = document.createElement("p");
  descricao.textContent = card.descricao;

  newElement.appendChild(titulo);
  newElement.appendChild(descricao);

  return newElement;
}

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.onclick = () => {
  window.localStorage.removeItem("listaTarefas");
};

const manipulaDados = {
  criarNovoCard,
  criarNovaColuna,
  carregarDados,
};

export default manipulaDados;
