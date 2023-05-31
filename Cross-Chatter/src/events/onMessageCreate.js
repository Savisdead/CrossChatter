'use strict';

const { deconstructMention } = require('../enhancedMention');
const { triggerWH, setInMap, MESSAGE_LIMIT } = require('../utils');

const commands = require('../commands');

exports.onMessageCreate = async(botClient, network, channelsCache, msg) => {
    if (!msg.author || msg.author.discriminator === '0000' || !msg.channel.guild) {
        return;
    }

    const cur = network[msg.channel.id];
    if (!cur) {
        return;
    }

    if (msg.author.bot && cur.ignoreBots !== false) { 
        return;
    }

    if (msg.content.startsWith(botClient.prefix) && msg.member.roles.some(r => cur.managerRoles.includes(r) ) ) {

        const args = msg.content.split(' ');
        const label = args[0].slice(botClient.prefix.length, args[0].length);
        const command = commands[label];
        command(botClient, network, channelsCache, msg, args.slice(1, args.length) )
            .then( () => console.log(`EXEC: ${label} in ${cur.name} by ${msg.author.username}`) )
            .catch(console.log);

        return;
    }



    if (cur.ignore) { 
        return;
    }

    const attachments = msg.attachments.length > 0
        ? msg.attachments.map(a => a.url)
        : [];

    const fullLength = `${attachments.join('\n')}\n${msg.content}`.length;
    const fullMsg = [...attachments, ...deconstructMention(msg.content, msg.channel.guild)];

    if (fullLength > MESSAGE_LIMIT) {
        msg.channel.createMessage(`${msg.author.mention}: Message too long!`);
        return;
    }



    const messages = [];
    for (const channelID in network) {
        const channelConfig = network[channelID];
        if (channelConfig.channelID === msg.channel.id) {
            continue;
        }
        messages.push(await triggerWH(botClient, network, channelConfig, cur, msg.author, fullMsg) );

    }

    for (const channelID in network) {
        const channelConfig = network[channelID];
        if ( msg.content.includes("capybara") ){
          messages.push(await triggerWH(botClient, network, channelConfig, cur, "Cross-Chatter", [...attachments, ...deconstructMention(`Capybaras are highly communicative with members of their groups. They make unique sounds to share important information—warning of danger, signaling a move, and keeping track of their young.6 The sounds include teeth-chattering, squealing, whining, whistling, crying, barking, and clicking; each sound has a different meaning and is specific to their individual social group. Capybara young are particularly vocal, emitting sounds almost constantly.`, msg.channel.guild)]) );

        }
    }
    setInMap(channelsCache[msg.channel.id], msg.id, messages);
};
