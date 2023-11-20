import utils from "./utils.js";

const board = document.querySelector(".board");

function dragstartHandler(ev) {
  const dropZones = document.querySelectorAll(".dropzone");
  ev.dataTransfer.effectAllowed = "move";
  dropZones.forEach((dropzone) => dropzone.classList.add("highlight"));
  ev.target.classList.add("dragging");
}

function dragendHandler(ev) {
  const dropZones = document.querySelectorAll(".dropzone");
  dropZones.forEach((dropzone) => dropzone.classList.remove("highlight"));
  gravarColunaTrocaDeCard(ev);
  ev.target.classList.remove("dragging");
}

function dragoverHandler(ev) {
  ev.preventDefault();

  const dropzone = utils
    .matchParentNode(ev.target, "column")
    .querySelector(".dropzone");

  const draggingElement = document.querySelector(".dragging");
  const applyAfter = getNewPosition(dropzone, ev.clientY);

  if (applyAfter) {
    applyAfter.insertAdjacentElement("afterend", draggingElement);
  } else {
    dropzone.prepend(draggingElement);
  }
}

function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".card:not(.dragging)");

  let result;

  cards.forEach((card) => {
    const box = card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = card;
  });

  return result;
}

function gravarColunaTrocaDeCard(ev) {
  let novaColunaId = utils.matchParentNode(ev.target, "column").id;
  let dropzoneCards = utils
    .matchParentNode(ev.target, "dropzone")
    .querySelectorAll(".card");
  console.log(dropzoneCards);
  let localData = utils.getLocalStorage("boardData");
  let colunas = localData.colunas;
  let cardMovido;

  //Encontrando o card na coluna origem e removendo
  colunas.every((coluna) => {
    cardMovido = coluna.cards.find((item) => item.id === ev.target.id);
    if (cardMovido) {
      coluna.cards = coluna.cards.filter((item) => item !== cardMovido);
      return false;
    }
    return true;
  });

  //Adicionando o card movido na nova coluna
  let posicaoElementoNaColuna = Array.prototype.slice
    .call(dropzoneCards)
    .findIndex((el) => el.id === cardMovido.id);
  colunas.every((coluna) => {
    if (coluna.id === novaColunaId) {
      coluna.cards.splice(posicaoElementoNaColuna, 0, cardMovido);
      return false;
    }
    return true;
  });

  localData.colunas = colunas;
  utils.setLocalStorage("boardData", localData);
}

//BOARD
board.addEventListener("dragover", dragoverBoardHandler);

function dragoverBoardHandler(ev) {
  ev.preventDefault();
  const draggingElement = document.querySelector(".dragging");
  const outOfDropzone = getNewColumnPosition(ev.target, ev.clientX, ev.clientY);

  if (outOfDropzone) {
    outOfDropzone.appendChild(draggingElement);
  }
}

function getNewColumnPosition(board, posX, posY) {
  const columns = board.querySelectorAll(".column");

  let result;

  columns.forEach((column) => {
    const columnBox = column.getBoundingClientRect();

    if (posX >= columnBox.x && posX <= columnBox.x + columnBox.width) {
      const dropzone = column.querySelector(".dropzone");

      if (!dropzone) return;
      const dropzoneBox = dropzone.getBoundingClientRect();
      if (posY > dropzoneBox.y + dropzoneBox.height) {
        result = dropzone;
      }
    }
  });

  return result;
}

const dragAndDrop = {
  dragstartHandler,
  dragendHandler,
  dragoverHandler,
};

export default dragAndDrop;
