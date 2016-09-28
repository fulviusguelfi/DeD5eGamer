/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 // A $( document ).ready() block.
 $( document ).ready(function() {
    var app = {
        // Application Constructor
        initialize: function() {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function() {
            console.log('deviceready');
            var player = new Player('teste', 299, 43, 17, 21, 4, 2, 1);
            showPlayer(player);
            dados.create(player);
            player = new Player('teste1', 300, 18, 17, 10, 12, 11, 8);
            showPlayer(player);
            dados.create(player);
        }
    };

    function showPlayer (player) {
        console.log('ID: ' + player.getId);
        console.log('Nome: ' + player.nome);
        console.log('Proficiencia: ' + player.proficiencia());
        console.log('Nível: ' + player.nivel());
        console.log('Força: ' + player.forca + ' Mod Força: ' + player.modForca());
        console.log('Destreza: ' + player.destreza + ' Mod Destreza: ' + player.modDestreza());
        console.log('Cosntituição: ' + player.constituicao + ' Mod Cosntituição: ' + player.modConstituicao());
        console.log('Inteligência: ' + player.inteligencia + ' Mod Inteligência: ' + player.modInteligencia());
        console.log('Sabedoria: ' + player.sabedoria + ' Mod Sabedoria: ' + player.modSabedoria());
        console.log('Carisma: ' + player.carisma + ' Mod Carisma: ' + player.modCarisma());
        console.log('------------------------------------------------------------------------');
    };

    /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
    // Selects the correct stylesheet based on feature detects
    window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!(!t.document.createElementNS||!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||window.opera&&-1===navigator.userAgent.indexOf("Chrome")),o=function(o){var r=t.document.createElement("link"),a=t.document.getElementsByTagName("script")[0];r.rel="stylesheet",r.href=e[o&&n?0:o?1:2],a.parentNode.insertBefore(r,a)},r=new t.Image;r.onerror=function(){o(!1)},r.onload=function(){o(1===r.width&&1===r.height)},r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
    // Point to style sheet locations
    grunticon( [ "css/jquery.mobile.inline-svg-1.4.5.css","css/jquery.mobile.inline-png-1.4.5.css","css/jquery.mobile.external-png-1.4.5.css" ] );


    $.getScript( "js/model/domains.js" )
          .done(function( script, textStatus ) {
            console.log( script + " loaded: " + textStatus );
          })
          .fail(function( jqxhr, settings, exception ) {
            console.log( script + " load fail: " + exception );
          });

    $.getScript( "js/model/storage.js" )
          .done(function( script, textStatus ) {
            console.log( script + " loaded: " + textStatus );
          })
          .fail(function( jqxhr, settings, exception ) {
            console.log( script + " load fail: " + exception );
          });

    $.getScript( "js/model/player.js" )
      .done(function( script, textStatus ) {
        console.log( script + " loaded: " + textStatus );
      })
      .fail(function( jqxhr, settings, exception ) {
        console.log( script + " load fail: " + exception );
        });
    app.initialize();
});