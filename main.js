// ==UserScript==
// @name         v2ex_unread
// @namespace    http://tampermonkey.net/hello
// @version      0.1
// @description  try to take over the world!
// @author       lrjia
// @match        https://www.v2ex.com/*
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

function is_post_page(url) {
    let is_post = url.indexOf('/t/') > -1;
    GM_log("is post page: " + is_post);
    return is_post;
}

function post_id(url) {
    // https://www.v2ex.com/t/982998#reply129
    let id = url.split('/t/')[1].split('#')[0];
    GM_log("post id: " + id);
    return id;
}

function record_post(url) {
    // #Main > div:nth-child(4) > div:nth-child(1) > span
    // 129 条回复
    let reply_count = document.querySelector('#Main > div:nth-child(4) > div:nth-child(1) > span').innerText.split(' ')[0];
    GM_log("reply count: " + reply_count);

    // save
    let id = post_id(url);
    let data = {
        id: id,
        reply_count: reply_count,
    }
    let json = JSON.stringify(data);
    GM_log("json: " + json);
    GM_log("json: " + json);
    GM_setValue(id, json);
}

function edit_index() {
    //div.cell.item
    let items = document.querySelectorAll('div.cell.item');
    GM_log("items count: " + items.length);
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let a = item.querySelector('a');
        let url = a.href;
        let id = post_id(url);
        let json = GM_getValue(id);
        if (json) {
            let data = JSON.parse(json);
            let past_reply_count = data.reply_count;
            let reply_count = a.innerText
            let new_reply_count = parseInt(reply_count) - parseInt(past_reply_count);
            a.innerText = reply_count + ' (' + new_reply_count + ')';
            if (new_reply_count === 0) {
                a.style.visibility = 'hidden';
            }
        }
    }
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
