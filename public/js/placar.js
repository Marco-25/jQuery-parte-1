const urlPlacar = 'http://localhost:3000/placar';
/* mostar  placar */
$('#botao-placar').click(mostrarPlacar);
$('#botao-sync').click(sincronizaPlacar);

function mostrarPlacar(){
    $('.placar').stop().slideToggle(600);
}

/*****************************************/
/* Insere placar */
function InserePlacar() {

    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Marco";
    var numeroPalavra = $('#contador-palavras').text();

    var linha =  novaLinha(usuario,numeroPalavra);
    linha.find('.botao-remover').click(removeLinha);
    corpoTabela.prepend(linha);
    $('.placar').slideDown(500);
    scrollPlacar();
}

/* scrool do placar */
function scrollPlacar() {
    var posicaoPlacar = $('.placar').offset().top;
    $('body').animate({
        scrollTop: posicaoPlacar+'px'
    }, 1000);
}

/* novalinha linha do placar */
function novaLinha(usuario,numeroPalavra){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numeroPalavra);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass('botao-remover ').attr('href',"#");
    var icone = $("<i>").addClass('material-icons').text('delete');

    link.append(icone); // colocar tag <i> dentro da tag <a>
    colunaRemover.append(link); // colocar tag <a> dentro da tag <td>

    // montarlinha : colocar uma <td> do lado da outra dentro da tag <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

/* remover linha do placar */
function removeLinha() {
    event.preventDefault()
    var linha = $(this).parent().parent().fadeOut(1000);
    setTimeout( () => linha.remove(), 1000 );

}

function sincronizaPlacar() {
    var arrayPlacar = [];
    var todasLinhas = $("tbody > tr");

    todasLinhas.each(function (){
        var usuario = $(this).find("td:nth-child(1)").text();
        var pontos = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: pontos
        }

        arrayPlacar.push(score)
    });
    let dados = {
        placar: arrayPlacar
    }
    $.post(urlPlacar , dados, function () {
        console.log("Salvou os dados no servidor");
    } ).fail(function (){
        console.log("Ocorreu um erro.");
    });
}

function atualizaPlacar() {

    $.get(urlPlacar, function (dados){
        $(dados).each(function (){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
    });
}
























