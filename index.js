const Aoijs = require('aoi.js')

const bot = new Aoijs.Bot({
    token: 'OTcwOTIzMTA1MDU0NzY5MTgy.GCMhMX.XuuV5TiwSIqUQ_4QVbcyneiJ94zk0IAcFyR8bU',
    prefix: ["!"],
    intents: "all",
})

bot.onMessage()

const loader = new Aoijs.LoadCommands(bot)
loader.load(bot.cmd,"./commands/")