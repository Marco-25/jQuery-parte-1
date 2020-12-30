const urlGet = "http://localhost:3000/frases";
$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

function fraseAleatoria() {
    $('#spinner').toggle();
    $.get(urlGet, trocaFraseAleatoria) //requisição
        .fail(function (){
            $('#erro').toggle();
            setTimeout(function () {
                $('#erro').toggle();

            },2500)
        }).always( () => {
            $('#spinner').toggle();
        });
}

function trocaFraseAleatoria(data) {
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numeroAleatorio].texto);
     atualizaTamanhoFrase();
    atualizatempoInicail(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $('#spinner').toggle();
    var fraseId = $('#frase-id').val();
    console.log("id do campo input :" + fraseId);
    var dados = {id: fraseId};
    $.get(urlGet,dados, trocaFrase)
        .fail(function () {
            $('#erro').toggle();
            setTimeout(function () {
                $('#erro').toggle();

            },2500)
         }).always(function () {
        $('#spinner').toggle();
    });

}

function trocaFrase(data) {
    $(".frase").text(data.texto);
    atualizaTamanhoFrase();
    atualizatempoInicail(data.tempo);
}






























