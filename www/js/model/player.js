$.getScript( "js/model/domains.js" )
      .done(function( script, textStatus ) {
        console.log( "Script loaded: " + textStatus );

            var palyer = {
                pontosDeVida: 0,
                danoTotal: 0,
                danoUltimoAtaque: 0,
                iniciativa: 0,
                pontosDeExperiencia: 0,
                nivel: function(){
                    return palyer.nivelPorExperiencia( pontosDeExperiencia ).nivel;
                },
                proficiencia: function(){
                    return palyer.nivelPorExperiencia( pontosDeExperiencia ).proficiencia;
                },
                nivelPorExperiencia: function ( experiencia = 0 ){
                     var obj = null;
                     $.each( experienciaNivelProficiencia, function( key, value ) {
                       // use i as an array index
                       console.log('Key: '+ key + ' and Value: ' + value);
                       if (experiencia >= key){
                         obj = value
                       }
                       console.log('Nível: ' + obj.nivel + ' Proficiencia: ' + obj.proficiencia);
                     });
                     return obj;
                 }
            };
      })
      .fail(function( jqxhr, settings, exception ) {
        console.log( "Script load fail: " + exception );
      });



