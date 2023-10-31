import utils from "./utils.js";
import modalFunctions from "./modal.js";

function carregarDados() {
  const listaTarefas = JSON.parse(window.localStorage.getItem("listaTarefas"));

  const column = document.getElementById("addColumn");

  if (listaTarefas) {
    while (column.parentNode.childElementCount > 1) {
      column.parentNode.removeChild(column.parentNode.firstChild);
    }

    if (listaTarefas.colunas) {
      listaTarefas.colunas.forEach((coluna) => {
        let novaColuna = criarNovaColuna(coluna);
        let dropzone = novaColuna.querySelector(".dropzone");
        coluna.cards.forEach((card) => {
          const novoCard = criarNovoCard(card);
          dropzone.appendChild(novoCard);
        });

        column.parentNode.insertBefore(novaColuna, column);
        modalFunctions.adicionaCartaoListener(
          novaColuna.querySelector(".btn").id
        );
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
  botao.className = "btn";
  botao.id = utils.padronizaString(coluna.nomeColuna + "_add");

  novaColuna.appendChild(nomeColuna);
  novaColuna.appendChild(dropzone);
  novaColuna.appendChild(botao);

  return novaColuna;
}

function criarNovoCard(card) {
  let newElement = document.createElement("div");
  newElement.className = "card";
  newElement.setAttribute("draggable", "true");
  if (card.img) {
    let img = document.createElement("img");
    img.src = card.img;
    newElement.appendChild(img);
  }

  let cardHead = document.createElement("div");
  cardHead.classList = "card-head";

  let titulo = document.createElement("h3");
  titulo.textContent = card.tituloCard;

  const modal = document.querySelector(".modal");
  let btnEdit = document.createElement("span");
  btnEdit.className = "material-symbols-outlined btn-edit";
  btnEdit.id = "editCard";
  btnEdit.innerHTML = "edit_square";
  btnEdit.onclick = (ev) => {
    modal.style.display = "block";
    console.log(ev.target.parentNode.parentNode);
    //PEGAR OS DADOS DO CARD
    //CRIAR A ESTRUTURA PARA EDITAR O CARD NO MODAL
    //PASSAR OS DADOS DO CARD PARA ESTRUTURA
  };

  let descricao = document.createElement("span");
  descricao.textContent = card.descricao;

  cardHead.appendChild(titulo);
  cardHead.appendChild(btnEdit);
  newElement.appendChild(cardHead);
  newElement.appendChild(descricao);

  return newElement;
}

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.onclick = () => {
  window.localStorage.removeItem("listaTarefas");
  window.location.reload();
};

const manipulaDados = {
  criarNovoCard,
  criarNovaColuna,
  carregarDados,
};

export default manipulaDados;
