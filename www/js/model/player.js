var player = {
    pontosDeVida: 0,
    danoTotal: 0,
    danoUltimoAtaque: 0,
    iniciativa: 0,
    pontosDeExperiencia: 0,
    nivel: function(){
        return nivelProficienciaPorExperiencia( player.pontosDeExperiencia ).nivel;
    },
    proficiencia: function(){
        return nivelProficienciaPorExperiencia( player.pontosDeExperiencia ).proficiencia;
    }
};

function nivelProficienciaPorExperiencia( experiencia = 0 ){
    var obj = null;
    $.each( experienciaNivelProficiencia, function( key, value ) {
        if (experiencia >= key){
         obj = value
        }
    });
    return obj;
}



