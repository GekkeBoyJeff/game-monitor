const {
    SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with information about the server'),
    async execute(interaction) {
        await interaction.reply({
            content: `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nCreated at:${interaction.guild.createdAt}`,
            ephemeral: true // Dan ziet niet iedereen die gegevens maar alleen jij zelf
        });
    },
};