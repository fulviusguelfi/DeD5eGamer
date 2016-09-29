function listaPlayers(container) {
    $.each(dados.players, function (key, value) {
        var linha = $('<li>');
        var celula = $('<a>');
        var link = $('<a href="#pageone" data-icon="delete">');
        $('<img src="img/elfo-druida.jpg">').appendTo(celula);
        $('<h2>' + value.nome + '</h2>').appendTo(celula);
        $('<p>' + value.pontosDeExperiencia + '</p>').appendTo(celula);
        celula.appendTo(linha);
        link.appendTo(linha);
        linha.appendTo(container);
    });
    $(container).listview('refresh');
}
/**
 * Created by fulvius on 29/09/16.
 */
