$(document).ready(() => {
    const mcurl = "mc.zake2002.xyz:19132";
    $.getJSON("https://api.mcsrvstat.us/1/" + mcurl, (status) => {
        if (status.debug.ping) {
            $("#status").text("Online!").addClass("online");
            $("#players_num").text(`(${status.players.online}/${status.players.max})`);
        } else {
            $("#status").text("Offline").addClass("offline");
            $("#players_num").hide();
        }
    });
});