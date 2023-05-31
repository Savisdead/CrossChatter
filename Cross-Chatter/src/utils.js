'use strict';

const { enhanceMention } = require('./enhancedMention');


exports.MESSAGE_LIMIT = 2000;
const LIMIT = 30;



function filterUsername(username) {
    return username;
}

exports.triggerWH = async function (bot, network, channelConfig, originConfig, user, content) {
    const guildObj = bot.guilds.get(channelConfig.guildID);
    let message = null;
    try {
        const username = filterUsername(user.username);
        await bot.executeWebhook(channelConfig.whID, channelConfig.whToken, {
            username: `${originConfig.identifier}${username}#${user.discriminator} - ${originConfig.name}`,
            avatarURL: user.avatarURL,
            content: enhanceMention(content, guildObj),
            wait: true,
            auth: true,
        } );
    } catch (err) {

        for (const c in network) {
            if (network[c].guildID === channelConfig.guildID) {
                continue;
            }
            try {
                await bot.executeWebhook(network[c].whID, network[c].whToken, {
                    username: bot.user.username,
                    avatarURL: bot.user.avatarURL,
                    content: errMsg,
                } );
            } catch (_) {
               
            }
        }
    }
    return message;
};

exports.setInMap = function (map, key, value) {
    map.set(key, value);

    if (map.size > LIMIT) {
        const iter = map.keys();
        while (map.size > LIMIT) {
            map.delete(iter.next().value);
        }
    }
};
