var palyer = {
    pontosDeVida: 0,
    danoTotal: 0,
    danoUltimoAtaque: 0,
    iniciativa: 0,
    pontosDeExperiencia: 0,
    nivel: function(){
        return nivelPorExperiencia( pontosDeExperiencia )
    }
};

function nivelPorExperiencia( experiencia ){
    var nuivel = 0;
    var experienciaNivel = {
        0: 1,
        300: 2,
        900: 3
    };
    $.each( experienciaNivel, function( key, value ) {
      // use i as an array index
      console.log('Key: '+ key + ' and Value: ' + value);
      if (experiencia > key){
        nivel = value
      }
    });
    return nivel;
};


