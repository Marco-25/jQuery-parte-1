/* contador de palavras*/
var tempoInicial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');

$(  /* mesma coisa que colocar $(document).ready(function(){...})*/
    function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numeroPalavras);
}
/**************************************/
/* contador de caracteres e palavras*/
function inicializaContadores(){
    campo.on('input', function () {
        var conteudo = campo.val().trim();

        var quantidadePlavras = (conteudo.split(/\S+/).length - 1);
        $('#contador-palavras').text(quantidadePlavras);

        var quantidadeCaractere = conteudo.length;
        $('#contador-caracteres').text(quantidadeCaractere);

    });
}
/*****************************************/
/* contador de tempo */
function inicializaCronometro(){
    var tempoRestante = $('#tempo-digitacao').text();

    campo.one('focus', () => {
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval( () => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1 ) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}
/*****************************************/
/* finaliza jogo jogo */
finalizaJogo = () => {

    campo.attr("disabled", true);
    campo.toggleClass('campo-desativado');
    InserePlacar();
}
/*****************************************/
/* reiniciar jogo */
reiniciaJogo = () => {
        campo.attr('disabled', false);
        campo.val("");
        $('#contador-palavras').text("0");
        $('#contador-caracteres').text("0");
        $('#tempo-digitacao').text(tempoInicial);
        inicializaCronometro();
        campo.toggleClass('campo-desativado');
        campo.removeClass('borda-vermelha');
        campo.removeClass('borda-verde');
}
/*****************************************/
/* feedback visual enquanto escreve caso escreva uma palavra errada */
inicializaMarcadores = () => {
    var frase = $('.frase').text();
    campo.on('input', function () {

        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);

        var ehCorreto = (digitado == comparavel);

        campo.toggleClass("borda-verde", ehCorreto);
        campo.toggleClass("borda-vermelha", !ehCorreto);
    });
}

































