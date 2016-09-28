var dados = {
    players: [],
    create: function(player){
        dados.players[dados.players.length] = player;
    },
    remove: function(player){
        $.each(dados.players, function(index, value){
            if( value instanceof Player && value.getId === player.getId ){
                dados.players.splice(index, 1);
            }
        });
    },
    save: function(){
        window.localStorage.setItem('palyers', JSON.stringify(dados.players));
    },
    load: function(){
        dados.players = JSON.parse(window.localStorage.getItem('palyers'));
    }
};
