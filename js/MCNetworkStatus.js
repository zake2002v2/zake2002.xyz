$(document).ready(() => {
    const mcnetworkurl = "mcnetwork.zake2002.xyz:19132";   
    $.getJSON("https://api.mcsrvstat.us/1/" + mcnetworkurl, (network) => {
        if (network.debug.ping) {
            if (network.players.max != 0) {
                $("#network").text(`(${network.players.online}/${network.players.max} on network)`);
            } else {
                $("#network").text(`(${network.players.online} on network)`);
            }
            $("#networkOffline").hide; //Didn't wanna have to resort to this
        } else {
            $("#networkOffline").text("(Network Unavailable)");
        }
    });
});

/* This is what I wished could work, but apparently for some reason it can't color from styles.css

$(document).ready(() => {
    const mcnetworkurl = "mcnetwork.zake2002.xyz:19132";   
    $.getJSON("https://api.mcsrvstat.us/1/" + mcnetworkurl, (network) => {
        if (network.debug.ping) {
            if (network.players.max != 0) {
                $("#network").text(`(${network.players.online}/${network.players.max} on network)`);
            } else {
                $("#network").text(`(${network.players.online} on network)`);
            }
        } else {
            $("#network").text("(Network Unavailable)").addClass("offline");
        }
    });
});

If anyone out there can read this, please help */