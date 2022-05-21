const mongoose = require('mongoose')
const schema = require('./../schema')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setPresence({
            activities: [{
                name: "looking into apex stats",
                type: "PLAYING"
            }],
            status: "IDLE"
        })

        console.log(`Ready! Logged in as ${client.user.tag}`);
        await mongoose.connect(process.env.mongoURI, {
            keepalive: true
        })

        await new schema({
            message: 'hello world',
        }).save()
    },
};