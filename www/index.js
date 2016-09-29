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
$(document).ready(function () {
    //prepare scripts
    /*$.getScript("js/model/domains.js")
        .done(function (script, textStatus) {
            console.log(script + " loaded: " + textStatus);
        })
        .fail(function (jqxhr, settings, exception) {
            console.log(script + " load fail: " + exception);
        });

    $.getScript("js/model/storage.js")
        .done(function (script, textStatus) {
            console.log(script + " loaded: " + textStatus);
        })
        .fail(function (jqxhr, settings, exception) {
            console.log(script + " load fail: " + exception);
        });

    $.getScript("js/model/player.js")
        .done(function (script, textStatus) {
            console.log(script + " loaded: " + textStatus);
        })
        .fail(function (jqxhr, settings, exception) {
            console.log(script + " load fail: " + exception);
        });

    $.getScript("js/view/screen.js")
        .done(function (script, textStatus) {
            console.log(script + " loaded: " + textStatus);
        })
        .fail(function (jqxhr, settings, exception) {
            console.log(script + " load fail: " + exception);
        });*/

    var app = {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
        },
        // Bind Event Listeners
        //
        // Bind any events that are required on startup. Common events are:
        // 'load', 'deviceready', 'offline', and 'online'.
        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            console.log('deviceready');
            var player1 = DED5EGAMER.model.savePlayer(new DED5EGAMER.model.Player('teste', 299, 43, 17, 21, 4, 2, 1));
            var player2 = DED5EGAMER.model.savePlayer(new DED5EGAMER.model.Player('teste1', 300, 18, 17, 10, 12, 11, 8));
            player1.pontosDeExperiencia = 901;
            DED5EGAMER.model.savePlayer(player1);
            DED5EGAMER.view.listarPlayers(DED5EGAMER.model.players,'#playerList');


        }
    };

    app.initialize();
});