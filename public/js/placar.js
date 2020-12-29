/* mostar  placar */
$('#botao-placar').click(mostrarPlacar);

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
    $(this).parent().parent().fadeOut(1000);
    setTimeout(() =>  linha.remove(),1000);

}






















