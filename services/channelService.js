/**
 * param type 'text', 'voice', 'category'
 */
async function createChannel_(guild, name, parent, type, everyoneCanWrite) {
    let newChannel;
    newChannel = await guild.channels.create(name, {
        type: type ? type : 'text'
    });
    if (parent) {
        await newChannel.setParent(parent);
    }

    if (!everyoneCanWrite) {
        await newChannel.updateOverwrite(newChannel.guild.roles.everyone, {
            SEND_MESSAGES: false
        });
    }
    return newChannel;
}

function getCategoryByName_(guild, name) {
    let result = undefined;
    guild.channels.cache.forEach(channel => {
        if (channel.name.toLowerCase() === name && channel.type === 'category') {
            result = channel;
        }
    });
    return result;
}

async function getTextChannelByName_(guild, name) {
    let result = undefined;
    guild.channels.cache.forEach(channel => {
        if (channel.name === name && channel.type === 'text' && channel.deleted === false) {
            result = channel;
        }
    });
    return result;
}

function channelServiceFun() {
    return {
        createChannel: createChannel_,
        getCategoryByName: getCategoryByName_,
        getTextChannelByName: getTextChannelByName_,
    }
}

module.exports = channelServiceFun