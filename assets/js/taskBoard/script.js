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
    console.log();
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
