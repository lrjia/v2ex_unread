// ==UserScript==
// @name         lrjiaHello
// @namespace    http://tampermonkey.net/hello
// @version      0.1
// @description  try to take over the world!
// @author       You Name
// @match        https://www.v2ex.com/*
// @grant        GM_log
// ==/UserScript==

function is_post_page(url) {
    let is_post = url.indexOf('/t/') > -1;
    console.log("is post page: " + is_post);
    return is_post;
}

function post_id(url) {
    let id = url.split('/t/')[1];
    console.log("post id: " + id);
    return id;
}

function record_post(url) {

}

function edit_index() {

}


(function () {
    'use strict';

    // get url
    let url = window.location.href;

    if (is_post_page(url)) {
        record_post(url);
    } else {
        edit_index();
    }
})();
