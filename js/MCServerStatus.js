$(document).ready(() => {
    const mcurl = "mcserver.zake2002.xyz:29653";
    $.getJSON("https://api.mcsrvstat.us/1/" + mcurl, (server) => {
        if (server.debug.ping) {
            $("#status").text("Online!").addClass("online");
            if (server.players.max != 0) {
                $("#players_num").text(`${server.players.online}/${server.players.max} connected`);
            } else {
                $("#players_num").text(`${server.players.online} connected`);
            }
        } else {
            $("#status").text("Offline").addClass("offline");
            $("#players_num").hide;
        }
    });    
});