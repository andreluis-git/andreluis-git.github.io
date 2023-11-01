import utils from "./utils.js";
import modalFunctions from "./modal.js";
import dragAndDrop from "./script.js";

function carregarDados() {
  const listaTarefas = utils.getLocalStorage("boardData");

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
          novoCard.addEventListener("dragstart", dragAndDrop.dragstartHandler);
          novoCard.addEventListener("dragend", dragAndDrop.dragendHandler);
          dropzone.appendChild(novoCard);
        });

        column.parentNode.insertBefore(novaColuna, column);

        dropzone.addEventListener("dragover", dragAndDrop.dragoverHandler);
      });
    }
  }
}

function criarNovaColuna(coluna) {
  //Cria coluna
  let novaColuna = document.createElement("div");
  novaColuna.className = "column";
  novaColuna.id = coluna.id;

  //Cria cabeçalho coluna
  let colunaHead = document.createElement("div");
  colunaHead.classList = "coluna-head";
  let nomeColuna = document.createElement("h2");
  nomeColuna.textContent = coluna.nomeColuna;
  let btnMoreOptions = document.createElement("span");
  btnMoreOptions.classList = "material-symbols-outlined btn-more-coluna";
  btnMoreOptions.id = "btn-more-coluna";
  btnMoreOptions.innerHTML = "more_horiz";
  let dropdownOptions = document.createElement("div");
  dropdownOptions.classList = "more-coluna-dropdown";

  let editarOption = document.createElement("span");
  editarOption.innerHTML = "Editar";
  editarOption.addEventListener("click", function (ev) {
    let node = utils.matchParentNode(ev.target, "column");

    modalFunctions.modalEditarColuna(node);
  });

  let deleteOption = document.createElement("span");
  deleteOption.innerHTML = "Deletar";
  deleteOption.addEventListener("click", function (ev) {
    let node = utils.matchParentNode(ev.target, "column");

    removerColuna(node);
  });

  dropdownOptions.appendChild(editarOption);
  dropdownOptions.appendChild(deleteOption);

  colunaHead.appendChild(nomeColuna);
  colunaHead.appendChild(btnMoreOptions);
  colunaHead.appendChild(dropdownOptions);

  btnMoreOptions.addEventListener("click", function (ev) {
    dropdownOptions.style.display = "block";
  });

  window.addEventListener("click", function (ev) {
    if (ev.target != btnMoreOptions) {
      dropdownOptions.style.display = "none";
    }
  });

  let dropzone = document.createElement("div");
  dropzone.setAttribute("id", utils.padronizaString(coluna.nomeColuna));
  dropzone.className = "dropzone";
  let botao = document.createElement("a");
  botao.innerHTML = "Adicionar cartão";
  botao.href = "#";
  botao.className = "btn";
  botao.onclick = (ev) => {
    let colunaId = utils.matchParentNode(ev.target, "column").id;

    modalFunctions.modalCriarCard(colunaId);
  };

  novaColuna.appendChild(colunaHead);
  novaColuna.appendChild(dropzone);
  novaColuna.appendChild(botao);

  return novaColuna;
}

function criarNovoCard(card) {
  let newElement = document.createElement("div");
  newElement.className = "card";
  newElement.id = card.id;
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

  let btnMoreOptions = document.createElement("span");
  btnMoreOptions.classList = "material-symbols-outlined btn-more-card";
  btnMoreOptions.id = "btn-more-card";
  btnMoreOptions.innerHTML = "more_horiz";
  let dropdownOptions = document.createElement("div");
  dropdownOptions.classList = "more-card-dropdown";
  let deleteOption = document.createElement("span");
  deleteOption.innerHTML = "Deletar";
  deleteOption.id = "deletar_card";
  deleteOption.addEventListener("click", function (ev) {
    let node = utils.matchParentNode(ev.target, "card");

    removerCard(node);
  });

  dropdownOptions.appendChild(deleteOption);

  btnMoreOptions.addEventListener("click", function (ev) {
    dropdownOptions.style.display = "block";
  });

  window.addEventListener("click", function (ev) {
    if (ev.target != btnMoreOptions) {
      dropdownOptions.style.display = "none";
    }
  });

  cardHead.appendChild(titulo);
  cardHead.appendChild(btnMoreOptions);
  cardHead.appendChild(dropdownOptions);

  newElement.onclick = (ev) => {
    ev.preventDefault();
    if (
      ev.target.className.includes("material-symbols-outlined") ||
      ev.target.id?.includes("deletar_card")
    ) {
      return;
    }

    let node = utils.matchParentNode(ev.target, "card");

    modalFunctions.modalEditarCard(node);
  };

  let descricao = document.createElement("span");
  descricao.textContent = card.descricao;
  descricao.id = "card_descricao";

  newElement.appendChild(cardHead);
  newElement.appendChild(descricao);

  return newElement;
}

const removerColuna = (coluna) => {
  let localStorageDados = utils.getLocalStorage("boardData");
  localStorageDados.colunas = localStorageDados.colunas.filter(
    (el) => el.id !== coluna.id
  );

  utils.setLocalStorage("boardData", localStorageDados);
  document.getElementById(coluna.id).parentNode.removeChild(coluna);
};

const removerCard = (card) => {
  let colunaNome = utils.matchParentNode(card, "column");

  colunaNome = utils.padronizaString(colunaNome.querySelector("h2").innerHTML);

  let localStorageDados = utils.getLocalStorage("boardData");
  let colunaPosition = localStorageDados.colunas.findIndex(
    (coluna) => utils.padronizaString(coluna.nomeColuna) == colunaNome
  );

  localStorageDados.colunas[colunaPosition].cards = localStorageDados.colunas[
    colunaPosition
  ].cards.filter((el) => el.id !== card.id);

  utils.setLocalStorage("boardData", localStorageDados);

  document.getElementById(card.id).parentNode.removeChild(card);
};

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.onclick = () => {
  window.localStorage.removeItem("boardData");
  window.location.reload();
};

//INICIALIZAÇÃO DO BOARD
carregarDados();

const manipulaDados = {
  criarNovoCard,
  criarNovaColuna,
  carregarDados,
};

export default manipulaDados;
