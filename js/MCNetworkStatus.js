$(document).ready(() => {
    const mcnetworkurl = "mcnetwork.zake2002.xyz:19132";
    const mcmainserver = "mcnetwork.zake2002.xyz:29653";
    const mcservers = [
        mcmainserver,
        "pc.zake2002.xyz:29653",
        "mcnetwork.zake2002.xyz:13510",
        "mcnetwork.zake2002.xyz:32568",
        "mcnetwork.zake2002.xyz:42069",
        "hg-gaming.eu:25565"
    ];

    // Fetch network status
    $.getJSON(`https://api.mcsrvstat.us/1/${mcnetworkurl}`, (network) => {
        if (network.debug?.ping) {
            let connected = network.players?.online || 0;

            // Fetch statuses of all servers
            const requests = mcservers.map((serverUrl) => {
                return $.getJSON(`https://api.mcsrvstat.us/1/${serverUrl}`).then((server) => {
                    if (server.debug?.ping) {
                        connected += server.players?.online || 0;
                    }
                });
            });

            // Wait for all server requests to complete
            Promise.all(requests).then(() => {
                if (network.players?.max != 0) {
                    $("#network").text(`(${connected}/${network.players?.max} on network)`).addClass("connected");
                } else {
                    $("#network").text(`(${connected} on network)`).addClass("connected");
                }
            });
        } else {
            $("#network").text("(Network Unavailable)").addClass("offline");
        }
    }).fail(() => {
        $("#network").text("(Cannot ping network)").addClass("offline");
    });

    // Fetch main server status
    $.getJSON(`https://api.mcsrvstat.us/1/${mcmainserver}`, (mainserver) => {
        if (mainserver.debug?.ping) {
            $("#status").text("Online!").addClass("online");
            if (mainserver.players?.max != 0) {
                $("#players_num").text(`${mainserver.players?.online}/${mainserver.players?.max} connected`);
            } else {
                $("#players_num").text(`${mainserver.players?.online} connected`);
            }
        } else {
            $("#status").text("Offline").addClass("offline");

            // Fetch network details as a fallback for the hub status
            $.getJSON(`https://api.mcsrvstat.us/1/${mcnetworkurl}`, (network) => {
                if (network.debug?.ping) {
                    if (network.players?.max != 0) {
                        $("#players_num").text(`${network.players?.online}/${network.players?.max} in hub`);
                    } else {
                        $("#players_num").text(`${network.players?.online} in hub`);
                    }
                } else {
                    $("#players_num").hide();
                }
            }).fail(() => {
                $("#players_num").hide();
            });
        }
    }).fail(() => {
        $("#status").text("Error").addClass("offline");
        $("#players_num").hide();
    });
});