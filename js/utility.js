
// Combine a list of strings, joining with a space
function fuse(stringlist) {
    return stringlist.join(" ").trim();
}

// Like combine(), but returns an escaped version
function efuse(stringlist) {
    return escape(fuse(stringlist));
}

// Set the window location to a url
function go(url) {
    window.location = url;
}

function ifblank(params, true_url, false_url) {
    if (typeof params == "string") params = [params];

    if (params[0] == null) go(true_url);
    else go(false_url);
}

// Return a Google/Lucky url for a given query
function instant(query) {
    return ("http://google.com/search?btnI&q=" + query);
}

// Deal with an error message
function error(msg) {
    console.debug("[error] " + msg);
}

// Deal with a debugging message
function debug(fname, msg) {
    console.debug("[debug][" + fname + "] " + msg);
}

function add_line(msg) {
    window.outbox.innerHTML += msg;
    window.outbox.innerHTML += "<br />";
    window.searchbox.value = "";
    window.searchbox.focus();
}

function set_output(msg) {
    window.outbox.innerHTML = "";
    add_line(msg);
}

