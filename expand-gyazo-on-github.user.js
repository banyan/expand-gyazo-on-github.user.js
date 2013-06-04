// ==UserScript==
// @name           expand-gyazo-on-github.user.js
// @author         Kohei Hasegawa, originally @hiboma wrote. Thanks!
// @namespace      http://github.com/banyan
// @description    Expand inline Gyazo image tags on GitHub
// @include        https://github.com/*
// ==/UserScript==

function $A(array_like_object) {
  return Array.prototype.slice.call(array_like_object, 0);
}

var pattern     = /<a href="(http:\/\/gyazo\.com\/\w{32}).*<\/a>/g;
var replacement = '<a href="%source.png" target="_blank"><img src="%source.png" /></a>';

var replacing_class_names = [
  'comment-content' // github
];
var emit_button_class_names = [
  'preview-tab' // github issue comment preview
];

var expandGyazo = function() {
  setTimeout(function() {
    replacing_class_names.forEach(function(class_name) {
      var element = document.getElementsByClassName(class_name);
      $A(element).forEach(function(div) {
        div.innerHTML = div.innerHTML.replace(pattern, function(a, image_url) {
          return replacement.replace(/%source/g, image_url);
        });
      });
    });
  }, 1500);
}

var setObservers = function() {
  emit_button_class_names.forEach(function(emit_button_class_name) {
    var buttons = document.getElementsByClassName(emit_button_class_name);

    $A(buttons).forEach(function(button) {
      button.addEventListener('click', expandGyazo);
    });
  });
}

setObservers();
expandGyazo();
