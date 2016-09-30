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

    uniqueId: function () {
        return new Date().getTime() + ((Math.random() * new Date().getTime()) + 1);
    },
    players: [],

    savePlayer: function (player) {
        var updated = false;
        $.each(DED5EGAMER.model.players, function (index, value) {
            if (value.getId === player.getId) {
                updated = true;
                DED5EGAMER.model.players[index] = player;
            }
        });
        if (!updated) {
            DED5EGAMER.model.players[DED5EGAMER.model.players.length] = player;
        }
        return player;
    },

    removePlayer: function (player) {
        $.each(DED5EGAMER.model.players, function (index, value) {
            if (value.getId === player.getId) {
                DED5EGAMER.model.players.splice(index, 1);
                return false;
            }
        });
    },


    Player: function (nome, pontosDeExperiencia, forca, destreza, constituicao, inteligencia, sabedoria, carisma) {
        var id = DED5EGAMER.model.uniqueId();
        this.getId = id;
        this.nome = nome;
        this.pontosDeVida = 0;

        var danoTotal = 0;
        var danoUltimoAtaque = 0;
        //provoca dano
        this.agravar = function (dano) {
            danoTotal = danoTotal + dano;
            danoUltimoAtaque = dano;
        };
        //provoca cura de dano
        this.curar = function (cura) {
            danoTotal = danoTotal - cura;
        };
        this.iniciativa = 0;
        this.pontosDeExperiencia = pontosDeExperiencia;
        this.nivel = function () {
            return nivelProficienciaPorExperiencia(this.pontosDeExperiencia).nivel;
        };
        this.proficiencia = function () {
            return nivelProficienciaPorExperiencia(this.pontosDeExperiencia).proficiencia;
        };
        this.forca = forca;
        this.destreza = destreza;
        this.constituicao = constituicao;
        this.inteligencia = inteligencia;
        this.sabedoria = sabedoria;
        this.carisma = carisma;
        this.modForca = function () {
            return modificadorPorAtributo(this.forca);
        };
        this.modDestreza = function () {
            return modificadorPorAtributo(this.destreza);
        };
        this.modConstituicao = function () {
            return modificadorPorAtributo(this.constituicao);
        };
        this.modInteligencia = function () {
            return modificadorPorAtributo(this.inteligencia);
        };
        this.modSabedoria = function () {
            return modificadorPorAtributo(this.sabedoria);
        };
        this.modCarisma = function () {
            return modificadorPorAtributo(this.carisma);
        };
        var nivelProficienciaPorExperiencia = function (experiencia) {
            var obj = null;
            $.each(DED5EGAMER.domains.experienciaNivelProficiencia, function (key, value) {
                if (experiencia >= key) {
                    obj = value;
                }
            });
            return obj;
        };
        var modificadorPorAtributo = function (atributo) {
            return Math.floor(( (atributo - 10) / 2 ));
        };
    }
};

DED5EGAMER.view = {

    listarPlayers: function (players, container) {
        $(container).empty();
        $.each(players, function (key, value) {
            var linha = $('<li>');

            var celula1 = $('<a>');
            $('<img>').attr('src', 'img/elfo-druida.jpg').appendTo(celula1);
            $(celula1).append($('<h2>').append(value.nome));
            $(celula1).append($('<p>').append(value.pontosDeExperiencia));
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

    // é possível adicionar outros métodos e propriedades

};

//storage
var dados = {
    players: [],
    addPlayer: function (nome, pontosDeExperiencia, forca, destreza, constituicao, inteligencia, sabedoria, carisma) {
        var player = new Player(nome, pontosDeExperiencia, forca, destreza, constituicao, inteligencia, sabedoria, carisma);
        dados.add(player);
        return player
    },
    add: function (player) {
        dados.players[dados.players.length] = player;
        dados.save();
    },
    update: function (player) {
        var updated = false;
        dados.load();
        $.each(dados.players, function (index, value) {
            if (value.getId === player.getId) {
                updated = true;
                dados.players[index] = player;
            }
        });
        if (updated) {
            dados.save();
        } else {
            console.log('Player id: ' + player.getId + ' name: ' + player.nome + ' não foi encontrado nos dados locais');
        }
    },
    remove: function (player) {
        $.each(dados.players, function (index, value) {
            if (value.getId === player.getId) {
                dados.players.splice(index, 1);
            }
        });
        dados.save();
    },
    save: function () {
        window.localStorage.setItem('players', JSONfn.stringify(dados.players));
    },
    load: function () {
        dados.players = JSONfn.parse(window.localStorage.getItem('players'));
        return dados.players;
    }
};


/* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
// Selects the correct stylesheet based on feature detects
window.grunticon = function (e) {
    if (e && 3 === e.length) {
        var t = window, n = !(!t.document.createElementNS || !t.document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect || !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") || window.opera && -1 === navigator.userAgent.indexOf("Chrome")), o = function (o) {
            var r = t.document.createElement("link"), a = t.document.getElementsByTagName("script")[0];
            r.rel = "stylesheet", r.href = e[o && n ? 0 : o ? 1 : 2], a.parentNode.insertBefore(r, a)
        }, r = new t.Image;
        r.onerror = function () {
            o(!1)
        }, r.onload = function () {
            o(1 === r.width && 1 === r.height)
        }, r.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
    }
};
// Point to style sheet locations
grunticon(["css/jquery.mobile.inline-svg-1.4.5.css", "css/jquery.mobile.inline-png-1.4.5.css", "css/jquery.mobile.external-png-1.4.5.css"]);