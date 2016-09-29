function Player (nome, pontosDeExperiencia, forca, destreza, constituicao, inteligencia, sabedoria, carisma) {
    var id = new Date().getTime();
    this.getId = id;
    this.nome = nome;
    this.pontosDeVida = 0;
    this.danoTotal = 0;
    this.danoUltimoAtaque = 0;
    this.iniciativa = 0;
    this.pontosDeExperiencia = pontosDeExperiencia;
    this.nivel = function(){
        return nivelProficienciaPorExperiencia( this.pontosDeExperiencia ).nivel;
    };
    this.proficiencia = function(){
        return nivelProficienciaPorExperiencia( this.pontosDeExperiencia ).proficiencia;
    };
    this.forca = forca;
    this.destreza = destreza;
    this.constituicao = constituicao;
    this.inteligencia = inteligencia;
    this.sabedoria = sabedoria;
    this.carisma = carisma;
    this.modForca = function(){
        return modificadorPorAtributo( this.forca );
    };
    this.modDestreza = function(){
        return modificadorPorAtributo( this.destreza );
    };
    this.modConstituicao = function(){
        return modificadorPorAtributo( this.constituicao );
    };
    this.modInteligencia = function(){
        return modificadorPorAtributo( this.inteligencia );
    };
    this.modSabedoria = function(){
        return modificadorPorAtributo( this.sabedoria );
    };
    this.modCarisma = function(){
        return modificadorPorAtributo( this.carisma );
    };
}

function nivelProficienciaPorExperiencia( experiencia  ){
    var obj = null;
    $.each( experienciaNivelProficiencia, function( key, value ) {
        if (experiencia >= key){
         obj = value;
        }
    });
    return obj;
}

function modificadorPorAtributo ( atributo ){
    return Math.floor( ( (atributo - 10) /2 ) ) ;
}