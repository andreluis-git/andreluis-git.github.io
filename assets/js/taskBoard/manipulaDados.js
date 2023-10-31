import utils from "./utils.js";
import modalFunctions from "./modal.js";

function carregarDados() {
  const listaTarefas = JSON.parse(window.localStorage.getItem("boardData"));

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
  deleteOption.addEventListener("click", function (ev) {
    let node = ev.target;
    while (!node.className.match(/^card$/) && !node.id?.includes("card")) {
      node = node.parentNode;
    }

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

  const modal = document.querySelector(".modal");
  newElement.onclick = (ev) => {
    ev.preventDefault();
    if (
      ev.target.className.includes("material-symbols-outlined") ||
      ev.target.innerHTML?.includes("Deletar")
    ) {
      return;
    }

    modal.style.display = "block";

    let node = ev.target;
    while (!node.className.match(/^card$/)) {
      node = node.parentNode;
    }
    modalFunctions.modalEditarCard(node);
  };

  let descricao = document.createElement("span");
  descricao.textContent = card.descricao;
  descricao.id = "card_descricao";

  newElement.appendChild(cardHead);
  newElement.appendChild(descricao);

  return newElement;
}

const removerCard = (card) => {
  let colunaNome = card;
  while (!colunaNome.className.match(/^column$/)) {
    colunaNome = colunaNome.parentNode;
  }

  colunaNome = utils.padronizaString(colunaNome.querySelector("h2").innerHTML);

  let localStorageDados = JSON.parse(window.localStorage.getItem("boardData"));
  let colunaPosition = localStorageDados.colunas.findIndex(
    (coluna) => utils.padronizaString(coluna.nomeColuna) == colunaNome
  );
  let cardPosition = localStorageDados.colunas[colunaPosition].cards.findIndex(
    (el) => el.id == card.id
  );

  console.log(localStorageDados.colunas[colunaPosition].cards);

  localStorageDados.colunas[colunaPosition].cards = localStorageDados.colunas[
    colunaPosition
  ].cards.filter((el) => el.id !== card.id);

  window.localStorage.setItem("boardData", JSON.stringify(localStorageDados));

  document.getElementById(card.id).parentElement.removeChild(card);
};

const btnLimpar = document.getElementById("btnLimpar");
btnLimpar.onclick = () => {
  window.localStorage.removeItem("boardData");
  window.location.reload();
};

const manipulaDados = {
  criarNovoCard,
  criarNovaColuna,
  carregarDados,
};

export default manipulaDados;

/*TODO
removerCard
  apartar a rotina de encontrar posição do card no localstorage para reutilizar no modal.js gravarLocalStorage

*/
