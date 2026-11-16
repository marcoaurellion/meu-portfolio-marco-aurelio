var tela = document.getElementById("display");
tela.innerHTML = "0";

var numero1 = 0;
var operador = "";
var novoNumero = false;

function clean() {
    tela.innerHTML = "0";
    numero1 = 0;
    operador = "";
    novoNumero = false;
}

function insert(valor) {

    // Guarda a operação escolhida.
    if (valor == "+" || valor == "-" || valor == "x" || valor == "*" || valor == "/") {

        if (operador != "" && novoNumero == false) {
            calcular();
        }

        numero1 = parseFloat(tela.innerHTML);

        if (valor == "*") {
            operador = "x";
        } else {
            operador = valor;
        }

        novoNumero = true;
        return;
    }

    // Permite apenas um ponto decimal em cada número.
    if (valor == ".") {
        if (novoNumero == true) {
            tela.innerHTML = "0.";
            novoNumero = false;
        } else if (tela.innerHTML.indexOf(".") == -1) {
            tela.innerHTML = tela.innerHTML + ".";
        }
        return;
    }

    // Digita os números no visor.
    if (novoNumero == true || tela.innerHTML == "0") {
        tela.innerHTML = valor;
        novoNumero = false;
    } else {
        tela.innerHTML = tela.innerHTML + valor;
    }
}

function calcular() {

    if (operador == "" || novoNumero == true) {
        return;
    }

    var numero2 = parseFloat(tela.innerHTML);
    var resultado = 0;

    if (operador == "+") {
        resultado = numero1 + numero2;
    }
    else if (operador == "-") {
        resultado = numero1 - numero2;
    }
    else if (operador == "x") {
        resultado = numero1 * numero2;
    }
    else if (operador == "/") {
        if (numero2 == 0) {
            alert("Não é possível dividir por zero!");
            clean();
            return;
        }
        resultado = numero1 / numero2;
    }

    tela.innerHTML = resultado;
    numero1 = resultado;
    operador = "";
    novoNumero = true;
}

function back() {
    if (novoNumero == true) {
        return;
    }

    tela.innerHTML = tela.innerHTML.substring(0, tela.innerHTML.length - 1);

    if (tela.innerHTML == "" || tela.innerHTML == "-") {
        tela.innerHTML = "0";
    }
}

// Destaca por um instante o botão correspondente à tecla pressionada.
function destacarBotao(tecla) {
    var botoes = document.getElementsByTagName("button");
    var texto = tecla;

    if (tecla == "*") texto = "x";
    if (tecla == "Enter" || tecla == "=") texto = "=";
    if (tecla == "Backspace") texto = "<";
    if (tecla == "Escape" || tecla == "Delete") texto = "C";

    for (var i = 0; i < botoes.length; i++) {
        if (botoes[i].innerText.trim() == texto) {
            var botao = botoes[i];
            botao.classList.add("tecla-pressionada");
            setTimeout(function() {
                botao.classList.remove("tecla-pressionada");
            }, 160);
            break;
        }
    }
}

// Permite usar a calculadora pelo teclado do computador.
document.addEventListener("keydown", function(evento) {
    var tecla = evento.key;

    if (tecla >= "0" && tecla <= "9") {
        evento.preventDefault();
        destacarBotao(tecla);
        insert(tecla);
    }
    else if (tecla == "." || tecla == ",") {
        evento.preventDefault();
        destacarBotao(".");
        insert(".");
    }
    else if (tecla == "+" || tecla == "-") {
        evento.preventDefault();
        destacarBotao(tecla);
        insert(tecla);
    }
    else if (tecla == "*" || tecla == "x" || tecla == "X") {
        evento.preventDefault();
        destacarBotao("*");
        insert("x");
    }
    else if (tecla == "/") {
        evento.preventDefault();
        destacarBotao("/");
        insert("/");
    }
    else if (tecla == "Enter" || tecla == "=") {
        evento.preventDefault();
        destacarBotao("Enter");
        calcular();
    }
    else if (tecla == "Backspace") {
        evento.preventDefault();
        destacarBotao("Backspace");
        back();
    }
    else if (tecla == "Escape" || tecla == "Delete") {
        evento.preventDefault();
        destacarBotao("Escape");
        clean();
    }
});
