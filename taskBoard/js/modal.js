import manipulaDados from "./manipulaDados.js";

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
  btnCloseModal.className = "close";
  btnCloseModal.id = "closeModal";
  btnCloseModal.innerHTML = "&times;";
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
  modalTitulo.textContent = "Add Column";

  modalHeader.appendChild(modalTitulo);

  let label = document.createElement("label");
  label.textContent = "Título da coluna";
  label.style.display = "block";
  let input = document.createElement("input");
  input.id = "inputTituloId";

  modalBody.appendChild(label);
  modalBody.appendChild(input);

  let btnAdd = document.createElement("a");
  btnAdd.href = "#";
  btnAdd.textContent = "Adicionar";
  btnAdd.className = "btn";
  btnAdd.onclick = () => {
    const tituloNovaColuna = document.getElementById("inputTituloId").value;
    gravarDadosLocalStorage(tituloNovaColuna);
    modal.style.display = "none";
    resetarModal();
  };

  modalFooter.appendChild(btnAdd);
}

function resetarModal() {
  document.querySelector(".modal-content").innerHTML = "";
  criarBaseModal();
}

criarBaseModal();

//DADOS
function gravarDadosLocalStorage(titulo) {
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

//Listeners
const btnsAddCard = document.querySelectorAll(".btnAddCard");
const btnAddColumn = document.querySelector(".btnAddColumn");

btnsAddCard.forEach((btn) => {
  btn.onclick = () => {};
});

btnAddColumn.onclick = (ev) => {
  modalCriarColuna();
  modal.style.display = "block";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetarModal();
  }
};
