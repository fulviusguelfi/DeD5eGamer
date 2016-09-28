var dados = {
    players: [],
    add: function (nome = '', pontosDeExperiencia = 0, forca = 0, destreza = 0, constituicao = 0, inteligencia = 0, sabedoria = 0, carisma = 0){
        var player = new Player(nome, pontosDeExperiencia, forca, destreza, constituicao, inteligencia, sabedoria);
        dados.add(player);
        return player
    },
    add: function(player){
        dados.players[dados.players.length] = player;
        dados.save();
    },
    update: function(player){
        var updated = false;
        dados.load();
        $.each(dados.players, function(index, value){
            if( value instanceof Player && value.getId === player.getId ){
                updated = true;
                dados.players[index] = player;
            }
        });
        if (updated){
            dados.save();
        }else{
            console.log('Player id: ' + player.getId + ' name: ' + palyer.nome + ' não foi encontrado nos dados locais');
        }
    },
    remove: function(player){
        $.each(dados.players, function(index, value){
            if( value instanceof Player && value.getId === player.getId ){
                dados.players.splice(index, 1);
            }
        });
        dados.save();
    },
    save: function(){
        window.localStorage.setItem('palyers', JSON.stringify(dados.players));
    },
    load: function(){
        dados.players = JSON.parse(window.localStorage.getItem('palyers'));
        return dados.players;
    },
};

function showPlayers () {
    $.each(dados.players, function(index, value){
        showPlayer(value);
    }
};