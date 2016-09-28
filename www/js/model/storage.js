var dados = {
    players: [],
    create: function(player){
        dados.players[dados.players.length] = player;
    },
    remove: function(player){
        $.each(dados.players, function(index, value){
            if( value instanceof Players && value.getId === player.getId ){
                dados.players.splice(index, 1);
            }
        });
    },
    save: function(){
        window.localStorage.setItem('palyers', dados.players);
    },
    load: function(){
        dados.players = window.localStorage.getItem('palyers');
    }
};
