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
            $("#criarJogadorBtn").on('click', function (event) {
                DED5EGAMER.controler.player.newPlayer();
                $('#createPlayerFrm').trigger("reset");

            });
            $('#select-raca').on('change', function (event) {
                DED5EGAMER.controler.player.thePlayer.raca = $("#select-raca option:selected").val();
                $('#select-nome option[value!=""]').remove();
                $('#select-sobre-nome option[value!=""]').remove();
                DED5EGAMER.view.listarNomes('#select-nome');
                DED5EGAMER.view.listarSobreNomes('#select-sobre-nome');
            });
            $('#select-classe').on('change', function (event) {
                DED5EGAMER.controler.player.thePlayer.classe = $("#select-classe option:selected").val();
            });
            $('#select-nome').on('change', function (event) {
                $('#nome-jogador').val($("#select-nome option:selected").val()).trigger('change');
            });
            $('#select-sobre-nome').on('change', function (event) {
                $('#sobreNome-jogador').val($("#select-sobre-nome option:selected").val()).trigger('change');
            });
            $('#nome-jogador').on('change', function (event) {
                DED5EGAMER.controler.player.thePlayer.nome = $('#nome-jogador').val();
            });
            $('#sobreNome-jogador').on('change', function (event) {
                DED5EGAMER.controler.player.thePlayer.sobreNome = $('#sobreNome-jogador').val();
            });
            $('#createPlayerFrm').on('submit', function (event) {
                event.preventDefault();
                DED5EGAMER.controler.player.createPlayer();
                DED5EGAMER.view.listarJogadores('#playerList');
            });
            $('#createPlayerFrm').on('reset', function (event) {
                DED5EGAMER.view.listarJogadores('#playerList');
            });
        },
        // deviceready Event Handler
        //
        // The scope of 'this' is the event. In order to call the 'receivedEvent'
        // function, we must explicitly call 'app.receivedEvent(...);'
        onDeviceReady: function () {
            console.log('deviceready');
            DED5EGAMER.view.listarRacas('#select-raca');
            DED5EGAMER.view.listarClasses('#select-classe');
            DED5EGAMER.view.listarJogadores('#playerList');
            
            $("#attr-accordion").accordion({
                collapsible: true,
                autoHeight: true
            });
            
            $(".attr-sortable").sortable({
                connectWith: ".attr-connectedSortable"
            }).disableSelection();
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

    app.initialize();
});