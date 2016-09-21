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
        console.log('\'Allo \'Allo!');
        // Let us load the content dynamically
        // set up some variables
        var $mainContent = $("#main-content"),
          $pageWrap    = $("#page-wrap"),
          baseHeight   = 0,
          $el;

        // calculate wrapper heights to prevent jumping when loading new content
        $pageWrap.height($pageWrap.height());
        baseHeight = $pageWrap.height() - $mainContent.height();

        function loadContent(href) {

          $mainContent
              .find("#guts")
              .fadeOut(200, function() { // fade out the content of the current page
                  $mainContent
                      .hide()
                      .load(href + " #guts", function() { // load the contents of whatever href is
                          $mainContent.fadeIn(200, function() {
                              $pageWrap.animate({
                                  height: baseHeight + $mainContent.height() + "px"
                          });
                          });

                      });

              });

        }

        var $r = $('.roulette').fortune(24);

        var clickHandler = function() {
          $('.spinner').off('click');
          $('.spinner span').hide();
          $r.spin().done(function(price) {
              $('.spinner').on('click', clickHandler);
              $('.spinner span').show();
              loadContent('/questionpage.html');
          });
        };

        $('.spinner').on('click', clickHandler);


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
