const form = document.querySelector(".form");
const lista = document.querySelector(".lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(element => {
    criarNota(element);
});

form.addEventListener("submit", event => {
    event.preventDefault();
    
    const notaValue = event.target.elements["textarea"];

    if(notaValue.value === '') {
        throw new Error("O campo nota não pode estar vazio");
    }

    const notaAtual = {
        "nota": notaValue.value
    }

    notaAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

    criarNota(notaAtual);
    itens.push(notaAtual);

    localStorage.setItem("itens", JSON.stringify(itens));

    notaValue.value = "";
})

function criarNota(nota) {
    const novoElemento = document.createElement("li");
    novoElemento.classList.add("nota");
    novoElemento.innerHTML = nota.nota;

    novoElemento.appendChild(botaoDeleta(nota.id));

    lista.appendChild(novoElemento);
}

function botaoDeleta(id) {
    const botao = document.createElement("button");
    botao.classList.add("deletaButton");
    botao.innerText = "x";

    botao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    });

    return botao;
}

function deletaElemento(tag, id) {
    tag.remove();
    itens.splice(itens.findIndex(element => element.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));        
}