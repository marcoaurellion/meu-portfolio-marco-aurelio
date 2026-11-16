var lampada = document.getElementById("lamp");
var acesa = false
var desligar = document.getElementById("desligar");
var ligar = document.getElementById("ligar");


desligar.addEventListener("click", function() {

    atualizarLampada(false);

});

ligar.addEventListener("click", function() {

    atualizarLampada(true);

});





function atualizarLampada(estado) {

    acesa = estado;

    if (acesa) {

    lampada.src = "assets/lamp_on.png";
     lampada.alt = "Lâmpada acesa";
    document.body.classList.add("acesa");
     ligar.classList.add("ativo");
     desligar.classList.remove("ativo");


    } else {

    lampada.src = "assets/lamp_off.png";
    lampada.alt = "Lâmpada apagada";
    document.body.classList.remove("acesa");
     desligar.classList.add("ativo");
     ligar.classList.remove("ativo");

}

}




atualizarLampada(false);