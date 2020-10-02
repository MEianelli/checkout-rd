let alfabeto = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXZ '
alfabeto = alfabeto.split("");
let numeros = [0,1,2,3,4,5,6,7,8,9];
var nomeCompleto = document.querySelector('#nomeUsuario');
var CPF = document.querySelector('#cpfUsuario');
var senha = document.querySelector("#senhaUsuario");
var confirma = document.querySelector('#confirmarSenhaUsuario');
var CEP = document.querySelector('#cepUsuario');
var endereco = document.querySelector('#enderecoUsuario');
var cidade = document.querySelector('#cidadeUsuario');
var estado = document.querySelector('#estadoUsuario');
var bairro = document.querySelector('#bairroUsuario');

function checagem(array,elemento){
    return array.includes(elemento);
}

function checarDigito(e){
    if(!checagem(alfabeto,e.key)){
        alert("Nome deve conter apenas letras");
    }
}

function checarTamanho(e,size,elemento){
    if(elemento.value.split("").length > size){
        alert("CPF deve conter apenas " + size + " digitos");
        elemento.value = "";
    }
}

function conferirSenha(){
    if(confirma.value != senha.value){
        alert("Senha deve ser igual a digitada anteriormente");
        confirma.value = ""; 
    }
}

async function apiCEP(){
    if(this.value.length == 8){
/*         fetch("https://brasilapi.com.br/api/cep/v1/"+this.value).then(
            function(resposta){
                return resposta.json().then(function(cep){
                    console.log(cep.city);
                })
            }
        ); */
        let resposta = await fetch("https://brasilapi.com.br/api/cep/v1/"+this.value)
        var cep = await resposta.json();
        console.log(cep);
    }
    endereco.value = cep.street;
    cidade.value = cep.city;
    bairro.value = cep.neighborhood;
    estado.value = cep.state;
}

nomeCompleto.addEventListener("keypress",checarDigito);
CPF.addEventListener('change',function(e){
    checarTamanho(e,10,this);
});
senha.addEventListener('change',function(e){
    checarTamanho(e,6,this);
});
confirma.addEventListener('change',conferirSenha);
CEP.addEventListener('keyup',apiCEP);


