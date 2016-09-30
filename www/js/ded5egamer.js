// espaco de nomes global
var DED5EGAMER = DED5EGAMER || {};

//domains
DED5EGAMER.domains = {
    experienciaNivelProficiencia: {
        0: {nivel: 1, proficiencia: +2},
        300: {nivel: 2, proficiencia: +2},
        900: {nivel: 3, proficiencia: +2}
    }
};

DED5EGAMER.model = {
    //collections
    players: [],

    savePlayer: function (player) {
        var updated = false;
        $.each(DED5EGAMER.model.players, function (index, value) {
            if (value.id === player.id) {
                updated = true;
                DED5EGAMER.model.players[index] = player;
            }
        });
        if (!updated) {
            DED5EGAMER.model.players[DED5EGAMER.model.players.length] = player;
        }
    },

    removePlayer: function (player) {
        $.each(DED5EGAMER.model.players, function (index, value) {
            if (value.id === player.id) {
                DED5EGAMER.model.players.splice(index, 1);
                return false;
            }
        });
    }
};

DED5EGAMER.model.data = {
    player: {
        id: 0,
        nome: '',
        raca: '',
        classe: '',
        pontosDeExperiencia: 0,
        nivel: 0,
        proficiencia: 0,
        pontosDeVida: 0,
        danoTotal: 0,
        danoUltimoAtaque: 0,
        iniciativa: 0,
        atributo: {
            forca: 0,
            destreza: 0,
            constituicao: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        },
        modificadorDeAtributo: {
            forca: 0,
            destreza: 0,
            constituicao: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0
        }
    }
};

DED5EGAMER.controler = {
    getUniqueId: function () {
        return new Date().getTime() + ((Math.random() * new Date().getTime()) + 1);
    }
};

DED5EGAMER.controler.player = {
    //regta do nivel e proficiencia da experiencia
    nivelProficienciaPorExperiencia: function (pontosDeExperiencia) {
        var obj = null;
        $.each(DED5EGAMER.domains.experienciaNivelProficiencia, function (key, value) {
            if (pontosDeExperiencia >= key) {
                obj = value;
            }
        });
        return obj;
    },
    //regta do modificador do atributo
    modificadorPorAtributo: function (atributo) {
        return Math.floor(( (atributo - 10) / 2 ));
    },
    createPlayer: function (classe, raca, nome) {
        player = Object.assign({}, DED5EGAMER.model.data.player);
        player.id = DED5EGAMER.controler.getUniqueId();
        player.nome = nome;
        player.raca = raca;
        player.classe = classe;
        this.refreshPlayer(player);
        return player;
    },
    refreshPlayer: function(player){
        player.nivel = DED5EGAMER.controler.player.nivelProficienciaPorExperiencia(player.pontosDeExperiencia).nivel;
        player.proficiencia = DED5EGAMER.controler.player.nivelProficienciaPorExperiencia(player.pontosDeExperiencia).proficiencia;
        player.modificadorDeAtributo.forca = DED5EGAMER.controler.player.modificadorPorAtributo(player.forca);
        player.modificadorDeAtributo.destreza = DED5EGAMER.controler.player.modificadorPorAtributo(player.destreza);
        player.modificadorDeAtributo.constituicao = DED5EGAMER.controler.player.modificadorPorAtributo(player.constituicao);
        player.modificadorDeAtributo.inteligencia = DED5EGAMER.controler.player.modificadorPorAtributo(player.inteligencia);
        player.modificadorDeAtributo.sabedoria = DED5EGAMER.controler.player.modificadorPorAtributo(player.sabedoria);
        player.modificadorDeAtributo.carisma = DED5EGAMER.controler.player.modificadorPorAtributo(player.carisma);
        DED5EGAMER.model.savePlayer(player);
    }
};

DED5EGAMER.view = {

    listarPlayers: function (container) {
        $(container).empty();
        $(container).listview();
        $.each(DED5EGAMER.model.players, function (key, value) {
            var linha = $('<li>');

            var celula1 = $('<a>');
            $('<img>').attr('src', 'img/elfo-druida.jpg').appendTo(celula1);
            $(celula1).append($('<h2>').append(value.nome));
            $(celula1).append($('<p>').append(value.nivel));
            linha.append(celula1);

            var celula2 = $('<a>').attr('data-icon', 'delete').attr('href', '#').click(event, function () {
                DED5EGAMER.model.removePlayer(value);
                DED5EGAMER.view.listarPlayers(DED5EGAMER.model.players, container);
            });
            linha.append(celula2);

            $(container).append(linha);
        });
        $(container).listview('refresh');
    }
};