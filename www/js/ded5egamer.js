// espaco de nomes global
var DED5EGAMER = DED5EGAMER || {};

//domains
DED5EGAMER.domains = {
    experienciaNivelProficiencia: {
        0: {nivel: 1, proficiencia: +2},
        300: {nivel: 2, proficiencia: +2},
        900: {nivel: 3, proficiencia: +2}
    },
    progressoCriacaoPorPaginaDestino: {
        10: '#playerPage',
        25: '#playerPage'
    },
    classes: ['druida', 'paladino'],
    racas: ['elfo', 'anão'],
    nomes: {
        elfo: ['Laucian', 'teste1'],
        anão: ['Oleg', 'Ivaar']
    },
    sobreNomes: {
        elfo: ["Nai'lo", 'teste1'],
        anão: ['Frostbread']
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
        window.localStorage.setItem('DED5EGAMER.players', JSON.stringify(DED5EGAMER.model.players));
    },

    removePlayer: function (player) {
        $.each(DED5EGAMER.model.players, function (index, value) {
            if (value.id === player.id) {
                DED5EGAMER.model.players.splice(index, 1);
                return false;
            }
        });
        window.localStorage.setItem('DED5EGAMER.players', JSON.stringify(DED5EGAMER.model.players));
    },

    loadAllPlayers: function () {
        if (window.localStorage.getItem('DED5EGAMER.players') !== null) {
            DED5EGAMER.model.players = JSON.parse(window.localStorage.getItem('DED5EGAMER.players'));
        }
    }
};

DED5EGAMER.model.data = {
    player: {
        id: 0,
        progressoCriacao: 0,
        nome: '',
        sobreNome: '',
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
    },
    rolarDado: function (faces) {
        return Math.floor((Math.random() * faces) + 1);
    },
    gerarAtributos: function () {
        var atributos = new Array(6);
        for (var i = 0; i < atributos.length; i++) {
            var dados = new Array(4);
            for (var a = 0; a < dados.length; a++) {
                dados[a] = DED5EGAMER.controler.rolarDado(6);
            }
            dados.sort(function(a, b){return b-a});
            atributos[i] = dados[0] + dados[1] + dados[2];
        }
        return atributos;
    }
};

DED5EGAMER.controler.player = {
    thePlayer: '',
    //regta do nivel e proficiencia da experiencia
    nivelProficienciaPorExperiencia: function () {
        var obj = null;
        $.each(DED5EGAMER.domains.experienciaNivelProficiencia, function (key, value) {
            if (DED5EGAMER.controler.player.thePlayer.pontosDeExperiencia >= key) {
                obj = value;
            }
        });
        return obj;
    },
    //regta do modificador do atributo
    modificadorPorAtributo: function (atributo) {
        return Math.floor(((atributo - 10) / 2));
    },
    newPlayer: function () {
        DED5EGAMER.controler.player.thePlayer = Object.assign({}, DED5EGAMER.model.data.player);
    },
    createPlayer: function () {
        DED5EGAMER.controler.player.thePlayer.id = DED5EGAMER.controler.getUniqueId();
        DED5EGAMER.controler.player.updateInCreationPalyer(10);
    },
    updateInCreationPalyer: function (progresso) {
        DED5EGAMER.controler.player.thePlayer.progressoCriacao = progresso;
        this.refreshPlayer(DED5EGAMER.controler.player.thePlayer);
    },
    refreshPlayer: function () {
        DED5EGAMER.controler.player.thePlayer.nivel = DED5EGAMER.controler.player.nivelProficienciaPorExperiencia().nivel;
        DED5EGAMER.controler.player.thePlayer.proficiencia = DED5EGAMER.controler.player.nivelProficienciaPorExperiencia().proficiencia;
        DED5EGAMER.controler.player.thePlayer.modificadorDeAtributo.forca = DED5EGAMER.controler.player.modificadorPorAtributo(DED5EGAMER.controler.player.thePlayer.forca);
        DED5EGAMER.controler.player.thePlayer.modificadorDeAtributo.destreza = DED5EGAMER.controler.player.modificadorPorAtributo(DED5EGAMER.controler.player.thePlayer.destreza);
        DED5EGAMER.controler.player.thePlayer.modificadorDeAtributo.constituicao = DED5EGAMER.controler.player.modificadorPorAtributo(DED5EGAMER.controler.player.thePlayer.constituicao);
        DED5EGAMER.controler.player.thePlayer.modificadorDeAtributo.inteligencia = DED5EGAMER.controler.player.modificadorPorAtributo(DED5EGAMER.controler.player.thePlayer.inteligencia);
        DED5EGAMER.controler.player.thePlayer.modificadorDeAtributo.sabedoria = DED5EGAMER.controler.player.modificadorPorAtributo(DED5EGAMER.controler.player.thePlayer.sabedoria);
        DED5EGAMER.controler.player.thePlayer.modificadorDeAtributo.carisma = DED5EGAMER.controler.player.modificadorPorAtributo(DED5EGAMER.controler.player.thePlayer.carisma);
        DED5EGAMER.model.savePlayer(DED5EGAMER.controler.player.thePlayer);
    },
    loadPlayer: function (player) {
        $.each(DED5EGAMER.model.players, function (index, value) {
            if (value.id === player.id) {
                DED5EGAMER.controler.player.thePlayer = value;
                return false;
            }
        });
    }
};

DED5EGAMER.view = {

    listarJogadores: function (container) {
        $(container).listview().empty();
        DED5EGAMER.model.loadAllPlayers();
        $.each(DED5EGAMER.model.players, function (key, value) {
            var linha = $('<li>');

            var celula1 = $('<a>')
                    .on('click', function (event) {
                        DED5EGAMER.controler.player.loadPlayer(value);
                        $.mobile.navigate(DED5EGAMER.domains.progressoCriacaoPorPaginaDestino[value.progressoCriacao]);
                    });
            $('<img>').attr('src', 'img/elfo-druida.jpg').appendTo(celula1);
            $(celula1).append($('<h2>').append(value.nome + ' ' + value.sobreNome));
            $(celula1).append($('<p>').append('Nível: ' + value.nivel));
            if (value.progressoCriacao < 100) {
                var playerlistprogressbar = $('<div>').progressbar({value: value.progressoCriacao});
                playerlistprogressbar.css({height: '0.7em'});
                playerlistprogressbar.find('.ui-progressbar-value').css({background: 'green'});
                $(celula1).append(playerlistprogressbar);
            } else {
                $(celula1).append($('<p>').append($('<span>').text('COMPLETO').addClass('greenLabel')).wrapInner('<strong>'));
            }
            linha.append(celula1);

            var celula2 = $('<a>').attr('data-icon', 'delete').attr('href', '#').click(event, function (event) {
                DED5EGAMER.model.removePlayer(value);
                DED5EGAMER.view.listarJogadores(container);
            });
            linha.append(celula2);
            $(container).append(linha);
        });
        $(container).listview('refresh');
        $.mobile.navigate('#listPlayers');
    },
    listarRacas: function (container) {
        DED5EGAMER.view.listarParaSelect(DED5EGAMER.domains.racas, container);
    },
    listarClasses: function (container) {
        DED5EGAMER.view.listarParaSelect(DED5EGAMER.domains.classes, container);
    },
    listarNomes: function (container) {
        DED5EGAMER.view.listarParaSelect(DED5EGAMER.domains.nomes[DED5EGAMER.controler.player.thePlayer.raca], container);
    },
    listarSobreNomes: function (container) {
        DED5EGAMER.view.listarParaSelect(DED5EGAMER.domains.sobreNomes[DED5EGAMER.controler.player.thePlayer.raca], container);
    },
    listarParaSelect: function (data, container) {
        $(container + ' option').slice(1).remove();
        $.each(data, function (index, value) {
            $(container).append(
                    $("<option>")
                    .addClass('capitalize')
                    .attr('value', value)
                    .text(value)
                    );
        });
    }
};