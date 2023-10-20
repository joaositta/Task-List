const button = document.querySelector('.button-add-task') /* Nos dois aqui voce pega as informação do html */
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

/*----------------------------------------------------------------------------------------------------- */

let minhaListaItens = []              /* Cria um Array */

function adicionarNovaTarefa() {      /* Criando uma função */
    minhaListaItens.push({
        tarefa: input.value,
        concluida: false

    })                          /* Adicionar o input a lista, e tambem se ta concluido ou não*/

    input.value= ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''

    minhaListaItens.forEach((item, posicao ) => { /* Aqui criamos uma varaivel Novali, onde armazenamos informação nela, e acrescentamos informação! */
        novaLi = novaLi + `
                                
        <li class="task ${item.concluida && "done"}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p> ${item.tarefa}</p>                                     
            <img src="./img/trash.png" alt="tarefa-para-lixo" onclick="deletarItem(${posicao})">
        </li>
        `   
                    /* Onclick serve para chamar uma função no final da imagem */
                    /* Acrescentamos as imagens junto com a informação que está em <p> </p> */
    })

    listaCompleta.innerHTML = novaLi /* Aqui acrecentatmos a lista completa na body em <ul> </ul> */

    localStorage.setItem('lista', JSON.stringify(minhaListaItens))
    /*Aqui esse codigo faz com que tudo que for inserido no input fique guardad no LocalStorage */

}

/*-----------------Deletar Tasks------------------- */
function deletarItem(posicao){
    minhaListaItens.splice(posicao, 1) /* Aqui splice serve para deletar dentro do array, precisa 
                                    fornecer posição e quantos itens alem dessa posição pra frente 
                                    quer deletar, 1 ou 2 ....etc*/
    
     mostrarTarefas()                               
}

/*-------------Trocar para Concluido--------------- */

function concluirTarefa(posicao){
    minhaListaItens[posicao].concluida= !minhaListaItens[posicao].concluida
    /* Aqui quando faço isso com esse sinal ! e o mesmo repere, inverto o valor dele
    True para False ou False para True */

    mostrarTarefas()
}

function recarregarTarefas(){

    const tarefasDoLocalStorage = localStorage.getItem('lista') /* Aqui ele vai no localStorage, pega a lista guardada */

    if(tarefasDoLocalStorage){
    minhaListaItens= JSON.parse(tarefasDoLocalStorage) /* Aqui ele tranforma de String em Objeto */
    }
    
    mostrarTarefas()    /* Aqui exibe a lista ja ""restaurada" novamente */
}



recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa) /* Aqui você define a ação/evento do botão */
