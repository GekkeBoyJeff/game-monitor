const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

const axios = require('axios')
const apexKey = process.env.apexKey

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apexinfo')
        .setDescription('Replies with some information of your apex account')
        // https://discordjs.guide/interactions/slash-commands.html#parsing-options
        .addStringOption(option => option.setName('username').setRequired(true).setDescription('Enter a username'))
        .addStringOption(option => option.setName('console').setRequired(true).setDescription('enter your console').addChoices({
            name: 'PC',
            value: 'PC'
        }, {
            name: 'XBOX',
            value: 'XBOX'
        }, {
            name: 'PS4',
            value: 'PS4'
        })),
    // .addChoice('PC', 'pc').addChoice('PS4', 'ps4').addChoice('XBOX', 'xbox')),

    async execute(interaction) {
        const username = interaction.options.getString('username');
        console.log(username)
        const typeConsole = interaction.options.getString('console')
        console.log(typeConsole)
        if (username !== '') {
            axios
                .get(`https://api.mozambiquehe.re/bridge?auth=${apexKey}&player=${username}&platform=${typeConsole}`)
                .then(async res => {
                    console.log(`statusCode: ${res.status}`)
                    // console.log(res)
                    console.log(res.data.global.battlepass)
                    const apexStatEmbed = new MessageEmbed()
                        .setColor('#e34949')
                        .setTitle(`aRanky`)
                        .setURL('')
                        .setAuthor({
                            name: `${username}`,
                            iconURL: '',
                            url: ''
                        })
                        // .setDescription('Some description here')
                        .setThumbnail(`${res.data.global.rank.rankImg}`)
                        .addFields({
                            name: 'Username',
                            value: res.data.global.name
                        }, {
                            name: 'Level',
                            value: `${res.data.global.level}`,
                            inline: true
                        }, {
                            name: 'Clan name',
                            value: 'Clan tag',
                            inline: true
                        }, )
                        .addField(`Rank:`, `${res.data.global.rank.rankName} ${res.data.global.rank.rankDiv}`, true)
                    // .setImage(`${res.data.global.rank.rankImg}`)
                    // .setTimestamp();

                    await interaction.reply({
                        embeds: [apexStatEmbed]
                    });
                    // await interaction.reply(`gebruikersnaam:${res.data.global.name}\nlevel:${res.data.global.level}\nRank:${res.data.global.rank.rankName} ${res.data.global.rank.rankDiv}\nRankscore: ${res.data.global.rank.rankScore}${res.data.global.rank.rankImg}`);
                })
                .catch(error => {
                    console.error(error)
                })
        }
    },
};