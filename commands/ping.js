module.exports = ({
    name: "ping",
    aliases: ['pong','info'],
    code: `$author[1;$serverName[$guildID];$serverIcon[$guildID]]
    $addField[1;<a:dealright:857108888990253086> Last Restart#COLON#;<t:$truncate[$divide[$readyTimeStamp;1000]]:R>]
    $addField[1;<a:dealright:857108888990253086> Database Latency#COLON#;$dbPingms]
    $addField[1;<a:dealright:857108888990253086> Latency#COLON#;$Pingms]
    $color[1;RANDOM]
    $thumbnail[1;$userAvatar[$authorId]]`
    })