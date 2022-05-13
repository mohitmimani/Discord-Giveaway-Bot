module.exports = [
  {
    name: "start",
    code: `
    $setTimeout[whileEnd;$get[timeoutData]s;{
    "channelId":"$channelID",
    "date":"$dateStamp",
    "time":"$message[1]",
    "host":"$authorID",
    "win":"$message[2]",
    "timeload":"<t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R>",
    "messageId":"$get[id]",
    "prize":"$messageSlice[2;3]"
    }]
    $let[timeoutData;$splitText[1]$textSplit[$math[$get[giveawayTime]/1000];.]]
    $let[id;$sendMessage[**Giveaway Started**!  {reactions:🎊} {newEmbed:{title:🎉 Giveaway 🎉} {description:**React with  🎊 to enter in giveaway**
    **Prize** : $messageSlice[2;3]
    **Ends** : <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R>
    **Hosted by** :  <@!$authorID>
    
    **Winner** : $message[2]} {color:BLUE}};yes]]
    
    $onlyIf[$messageSlice[2;3]!=;Argument price is missing]
    $onlyIf[$isNumber[$message[2]]==true;Invalid number of winner given]
    $onlyIf[$get[giveawayTime]!=-1;Invalid usages **!start {time} {winnerNumber} {price}**]
    $let[giveawayTime;$parseTime[$if[$message[1]!=;$message[1];1s10ms]]]
    $onlyPerms[managemessages;There are not enough permissions for you to do this command]
    `,
  },
  {
    name: "whileEnd",
    type: "timeout",
    code: `
    $editMessage[$timeoutData[messageId];**Giveaway Ended**!  {newEmbed:{title:🎉 Giveaway ended 🎉} {description:**Prize** : $timeoutData[prize]
        **Ended** : <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$timeoutData[timeload]])/1000];.]:R>
        **Hosted by** : <@!$timeoutData[host]>

        **Winner(s)** : $if[$get[giveawayWinner]==;No winner (no participant);$get[giveawayWinner]]} {color:RED}};$timeoutData[channelId]]

        
    $channelSendMessage[$timeoutData[channelId];$if[$get[giveawayWinner]!=;\`🎉\` Congrats $get[giveawayWinner] you won **$timeoutData[prize]**;Not enough participant to decide a winner]]
    $let[giveawayWinner;$djsEval[
    var arrayy = "$getReactions[$timeoutData[channelId];$timeoutData[messageId];🎊;yes;id]".split(",")
    arrayy.splice(arrayy.indexOf("$clientId"),1)
    
    var array = arrayy
    var win = ""
    let u = $timeoutData[win]
    while (u != 0 && array!==[]) {
    let r = Math.floor(Math.random()*array.length);
    win += "<@!"+array[r]+">" + " "
    array.splice(array.indexOf(array[r]), 1)
    u = u - 1
    }
    win.split(" ").filter(function(a) {
    return a!='<@!undefined>' && a != ''
    }).join(", ")
    ;yes]]
    $onlyIf[$getMessage[$timeoutData[channelId];$timeoutData[messageId]]!=Giveaway Ended!;]
    `,
  }
];

