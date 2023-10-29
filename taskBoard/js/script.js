import manipulaDados from "./manipulaDados.js";

manipulaDados.carregarDados();

const cards = document.querySelectorAll(".card");
const dropZones = document.querySelectorAll(".dropzone");
const board = document.querySelector(".board");

cards.forEach((card) => {
  card.addEventListener("dragstart", dragstartHandler);
  card.addEventListener("dragend", dragendHandler);
});

function dragstartHandler(ev) {
  ev.dataTransfer.effectAllowed = "move";

  dropZones.forEach((dropzone) => dropzone.classList.add("highlight"));
  this.classList.add("dragging");
}

function dragendHandler(ev) {
  dropZones.forEach((dropzone) => dropzone.classList.remove("highlight"));
  this.classList.remove("dragging");
}

//DROPZONES
dropZones.forEach((dropZone) => {
  dropZone.addEventListener("dragover", dragoverHandler);
});

function dragoverHandler(ev) {
  ev.preventDefault();

  const draggingElement = document.querySelector(".dragging");
  const applyAfter = getNewPosition(this, ev.clientY);

  if (applyAfter) {
    applyAfter.insertAdjacentElement("afterend", draggingElement);
  } else {
    this.prepend(draggingElement);
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

//BOARD
board.addEventListener("dragover", dragoverBoardHandler);

function dragoverBoardHandler(ev) {
  ev.preventDefault();
  const draggingElement = document.querySelector(".dragging");
  const outOfDropzone = getNewColumnPosition(this, ev.clientX, ev.clientY);

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
