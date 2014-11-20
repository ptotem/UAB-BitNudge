remote_host = "http://localhost:3004/";
local_host = "http://localhost:3004/public/";
admin_pages_host = "http://localhost:3004/public/admin_pages/";

// for server
//remote_host = "http://chrumble.com:3019/";
//local_host = "http://chrumble.com:3019/public/";
//admin_pages_host = "http://localhost:3004/public/admin_pages/";

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

