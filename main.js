let result = document.querySelector("#result");
let inputString = document.querySelector("#inputString");
let listWords = [];
let finalResult = {};

//Objeto que recebe as palavras e suas frequencias
const wordFrequency = Object.create(null);

document.querySelector("#btn-send").addEventListener('click', function (event){
    event.preventDefault(), validar();

    listWords = extraiAcentos(inputString.value);

    for (const element of listWords) {
        if (!wordFrequency[element]) {
          // Se ainda não existir elemento, definimos como um, já que
          // estamos na primeira ocorrência.
          wordFrequency[element] = 1;
        } else {
          // Caso contrário, incrementamos um no número atual.
          wordFrequency[element] += 1;
        }
    }

    finalResult = JSON.stringify(wordFrequency);

    result.innerHTML = finalResult;
    
    return function(event){}
});

function extraiAcentos(lista){
    const tokens = ['/', ',', '.', ' ', '[', ']', '; ', '-', '_', '!', ': ', '?', '|']; //lista com acentos que devem ser removidos
    let cont = 0;
    let words = "";
    let listFinal = [];

    //percorre toda a string
    while(cont <= lista.length){
        
        //remover todos os espaços 
        if(lista[cont]==" "){
            lista[cont].replace(" ","");
            cont++;
        }
        
        if(!(lista[cont] in tokens)){
            words += lista[cont];
            cont +=1;
        }

        if(tokens.includes(lista[cont]) == true){
            listFinal.push(words);
            words = "";
            cont +=1;
        }
    }

    //adiciona as palavras após
    if(cont >= lista.length){
        words = words.replace(undefined, "");
        listFinal.push(words);
    }
    
    return listFinal;
}

function validar(){
    let input = document.getElementById("inputString");
    if((input.value == "") || (input.value == " ")){
         alert("Preencha todos os campos em branco.")
    }
}

