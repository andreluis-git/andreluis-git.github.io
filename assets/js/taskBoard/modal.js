import manipulaDados from "./manipulaDados.js";
import utils from "./utils.js";

const modal = document.querySelector(".modal");

//#region ModalBase
const criarBaseModal = () => {
  let modalContent = modal.querySelector(".modal-content");
  let modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  let modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  let modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  let btnCloseModal = document.createElement("span");
  btnCloseModal.className = "close material-symbols-outlined";
  btnCloseModal.id = "closeModal";
  btnCloseModal.innerHTML = "close";
  btnCloseModal.onclick = () => {
    modal.style.display = "none";
    resetarModal();
  };

  modalHeader.appendChild(btnCloseModal);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
};

//#endregion

function modalCriarColuna() {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");

  let modalTitulo = document.createElement("h2");
  modalTitulo.textContent = "Adicionar coluna";

  modalHeader.prepend(modalTitulo);

  let label = document.createElement("label");
  label.textContent = "Título da coluna";
  label.style.display = "block";
  let input = document.createElement("input");
  input.id = "inputTituloId";

  modalBody.appendChild(label);
  modalBody.appendChild(input);

  let btnAdd = document.createElement("a");
  btnAdd.href = "#";
  btnAdd.textContent = "Salvar";
  btnAdd.className = "btn";
  btnAdd.onclick = () => {
    const tituloNovaColuna = document.getElementById("inputTituloId").value;
    gravarNovaColunaLocalStorage(tituloNovaColuna);
    modal.style.display = "none";
    resetarModal();
  };

  modalFooter.appendChild(btnAdd);

  input.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (input.value) modalFooter.querySelector(".btn").click();
    }
  });

  modal.style.display = "block";
  input.focus();
}

function modalEditarColuna(coluna) {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");

  let modalTitulo = document.createElement("h2");
  modalTitulo.textContent = "Editar coluna";

  modalHeader.prepend(modalTitulo);

  let label = document.createElement("label");
  label.textContent = "Título da coluna";
  label.style.display = "block";
  let input = document.createElement("input");
  input.id = "inputTituloId";
  input.value = coluna
    .querySelector(".coluna-head")
    .querySelector("h2").innerHTML;

  modalBody.appendChild(label);
  modalBody.appendChild(input);

  let btnAdd = document.createElement("a");
  btnAdd.href = "#";
  btnAdd.textContent = "Salvar";
  btnAdd.className = "btn";
  btnAdd.onclick = () => {
    const novoTituloColuna = document.getElementById("inputTituloId").value;
    editarColunaLocalStorage(novoTituloColuna, coluna.id);
    modal.style.display = "none";
    resetarModal();
  };

  modalFooter.appendChild(btnAdd);

  input.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (input.value) modalFooter.querySelector(".btn").click();
    }
  });

  modal.style.display = "block";
}

//#region Modais card
function modalCriarCard(colunaId) {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");

  let modalTitulo = document.createElement("h2");
  modalTitulo.textContent = "Adicionar cartão";

  modalHeader.prepend(modalTitulo);

  let labelTitulo = document.createElement("label");
  labelTitulo.textContent = "Título do cartão";
  labelTitulo.style.display = "block";
  let inputTitulo = document.createElement("input");
  inputTitulo.id = "inputTituloId";
  let labelTexto = document.createElement("label");
  labelTexto.textContent = "Descrição do cartão";
  labelTexto.style.display = "block";
  let inputTexto = document.createElement("textarea");
  inputTexto.id = "inputTextoId";
  inputTexto.setAttribute("rows", 10);

  modalBody.appendChild(labelTitulo);
  modalBody.appendChild(inputTitulo);
  modalBody.appendChild(labelTexto);
  modalBody.appendChild(inputTexto);

  let btnAdd = document.createElement("a");
  btnAdd.href = "#";
  btnAdd.textContent = "Salvar";
  btnAdd.className = "btn";
  btnAdd.onclick = () => {
    const novoCard = {
      tituloCard: document.getElementById("inputTituloId").value,
      descricao: document.getElementById("inputTextoId").value,
    };

    gravarCardLocalStorage(novoCard, colunaId);
    modal.style.display = "none";
    resetarModal();
  };

  modalFooter.appendChild(btnAdd);

  inputTitulo.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (inputTitulo.value && inputTexto)
        modalFooter.querySelector(".btn").click();
    }
  });

  inputTexto.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (inputTitulo.value && inputTexto)
        modalFooter.querySelector(".btn").click();
    }
  });

  modal.style.display = "block";
}

function modalEditarCard(card) {
  const modalHeader = document.querySelector(".modal-header");
  const modalBody = document.querySelector(".modal-body");
  const modalFooter = document.querySelector(".modal-footer");

  let modalTitulo = document.createElement("h2");
  modalTitulo.textContent = "Adicionar cartão";

  modalHeader.prepend(modalTitulo);

  let labelTitulo = document.createElement("label");
  labelTitulo.textContent = "Título do cartão";
  labelTitulo.style.display = "block";
  let inputTitulo = document.createElement("input");
  inputTitulo.id = "inputTituloId";
  inputTitulo.value = card.querySelector("h3").innerHTML;
  let labelTexto = document.createElement("label");
  labelTexto.textContent = "Descrição do cartão";
  labelTexto.style.display = "block";
  let inputTexto = document.createElement("textarea");
  inputTexto.id = "inputTextoId";
  inputTexto.setAttribute("rows", 10);
  inputTexto.value = card.querySelector("#card_descricao").innerHTML;

  modalBody.appendChild(labelTitulo);
  modalBody.appendChild(inputTitulo);
  modalBody.appendChild(labelTexto);
  modalBody.appendChild(inputTexto);

  const colunaId = utils.matchParentNode(card, "column").id;

  let btnAdd = document.createElement("a");
  btnAdd.href = "#";
  btnAdd.textContent = "Salvar";
  btnAdd.className = "btn";
  btnAdd.onclick = () => {
    const novoCard = {
      tituloCard: document.getElementById("inputTituloId").value,
      descricao: document.getElementById("inputTextoId").value,
      id: card.id,
    };

    gravarCardLocalStorage(novoCard, colunaId);
    modal.style.display = "none";
    resetarModal();
  };

  modalFooter.appendChild(btnAdd);

  inputTitulo.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (inputTitulo.value && inputTexto)
        modalFooter.querySelector(".btn").click();
    }
  });

  inputTexto.addEventListener("keypress", function (ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (inputTitulo.value && inputTexto)
        modalFooter.querySelector(".btn").click();
    }
  });

  modal.style.display = "block";
}

//#endregion

function resetarModal() {
  document.querySelector(".modal-content").innerHTML = "";
  criarBaseModal();
}

criarBaseModal();

//#region Dados
function gravarNovaColunaLocalStorage(titulo) {
  let dados = utils.getLocalStorage("boardData");
  if (!dados) {
    dados = {
      colunas: [
        {
          nomeColuna: titulo,
          cards: [],
          id: `coluna_id_${Date.now()}`,
        },
      ],
    };
  } else {
    if (dados.colunas.find((e) => e.nomeColuna == titulo)) {
      alert("Coluna já existe");
      return;
    }

    dados.colunas.push({
      nomeColuna: titulo,
      cards: [],
      id: `coluna_id_${Date.now()}`,
    });
  }

  utils.setLocalStorage("boardData", dados);

  manipulaDados.carregarDados();
}

function editarColunaLocalStorage(titulo, colunaId) {
  let dados = utils.getLocalStorage("boardData");
  if (dados) {
    dados.colunas.forEach((el) => {
      if (el.id == colunaId) {
        el.nomeColuna = titulo;
      }
    });
  }

  utils.setLocalStorage("boardData", dados);

  manipulaDados.carregarDados();
}

function gravarCardLocalStorage(novoCard, colunaId) {
  let localStorageDados = utils.getLocalStorage("boardData");

  if (!localStorageDados) {
    alert("Não foi possível criar o card");
    return;
  }

  if (!novoCard.id) {
    novoCard.id = `card_id_${Date.now()}`;

    localStorageDados.colunas
      .find((coluna) => coluna.id == colunaId)
      .cards.push(novoCard);
  } else {
    let colunaPosition = localStorageDados.colunas.findIndex(
      (coluna) => coluna.id == colunaId
    );

    let cardPosition = localStorageDados.colunas[
      colunaPosition
    ].cards.findIndex((card) => card.id == novoCard.id);

    localStorageDados.colunas[colunaPosition].cards[cardPosition] = novoCard;
  }

  utils.setLocalStorage("boardData", localStorageDados);

  manipulaDados.carregarDados();
}

//#endregion

//#region Listeners
const btnAddColumn = document.querySelector(".btnAddColumn");

function adicionaCartaoListener(btnId) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    modalCriarCard(btnId);

    // modal.querySelector("#inputTituloId").focus();
  };
}

btnAddColumn.onclick = (ev) => {
  modalCriarColuna();

  // modal.querySelector("#inputTituloId").focus();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetarModal();
  }
};

window.onkeyup = function (ev) {
  if (ev.key === "Escape") {
    modal.style.display = "none";
    resetarModal();
  }
};

//#endregion

const modalFunctions = {
  adicionaCartaoListener,
  modalEditarCard,
  modalEditarColuna,
  modalCriarCard,
};

export default modalFunctions;
