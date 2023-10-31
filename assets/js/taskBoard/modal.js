import manipulaDados from "./manipulaDados.js";
import utils from "./utils.js";

const modal = document.querySelector(".modal");

//DOM
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
}

function modalCriarCard(btnId) {
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

  const colunaNome = btnId.replace("_add", "");

  let btnAdd = document.createElement("a");
  btnAdd.href = "#";
  btnAdd.textContent = "Salvar";
  btnAdd.className = "btn";
  btnAdd.onclick = () => {
    const novoCard = {
      tituloCard: document.getElementById("inputTituloId").value,
      descricao: document.getElementById("inputTextoId").value,
    };

    gravarCardLocalStorage(novoCard, colunaNome);
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
  inputTexto.value = card.querySelector("span").innerHTML;

  modalBody.appendChild(labelTitulo);
  modalBody.appendChild(inputTitulo);
  modalBody.appendChild(labelTexto);
  modalBody.appendChild(inputTexto);

  const nomeColuna = utils.padronizaString(
    card.parentNode.parentNode.querySelector("h2").innerHTML
  );

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

    gravarCardLocalStorage(novoCard, nomeColuna);
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
}

function resetarModal() {
  document.querySelector(".modal-content").innerHTML = "";
  criarBaseModal();
}

criarBaseModal();

//DADOS
function gravarNovaColunaLocalStorage(titulo) {
  let dados = JSON.parse(window.localStorage.getItem("listaTarefas"));
  if (!dados) {
    dados = {
      colunas: [
        {
          nomeColuna: titulo,
          cards: [],
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
    });
  }

  window.localStorage.setItem("listaTarefas", JSON.stringify(dados));

  manipulaDados.carregarDados();
}

function gravarCardLocalStorage(novoCard, colunaNome) {
  let localStorageDados = JSON.parse(
    window.localStorage.getItem("listaTarefas")
  );

  if (!localStorageDados) {
    alert("Não foi possível criar o card");
    return;
  }

  if (!novoCard.id) {
    novoCard.id =
      "card_" +
      localStorageDados.colunas.find(
        (coluna) => utils.padronizaString(coluna.nomeColuna) == colunaNome
      ).cards.length;

    localStorageDados.colunas
      .find((coluna) => utils.padronizaString(coluna.nomeColuna) == colunaNome)
      .cards.push(novoCard);
  } else {
    let colunaPosition = localStorageDados.colunas.findIndex(
      (coluna) => utils.padronizaString(coluna.nomeColuna) == colunaNome
    );

    let cardPosition = localStorageDados.colunas[
      colunaPosition
    ].cards.findIndex((card) => card.id == novoCard.id);

    localStorageDados.colunas[colunaPosition].cards[cardPosition] = novoCard;
  }

  window.localStorage.setItem(
    "listaTarefas",
    JSON.stringify(localStorageDados)
  );

  manipulaDados.carregarDados();
}

//Listeners
const btnAddColumn = document.querySelector(".btnAddColumn");

function adicionaCartaoListener(btnId) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    modalCriarCard(btnId);
    modal.style.display = "block";
    modal.querySelector("#inputTituloId").focus();
  };
}

btnAddColumn.onclick = (ev) => {
  modalCriarColuna();
  modal.style.display = "block";
  modal.querySelector("#inputTituloId").focus();
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

const modalFunctions = {
  adicionaCartaoListener,
  modalEditarCard,
};

export default modalFunctions;
