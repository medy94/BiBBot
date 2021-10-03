function getServerOwner_(msg) {
    return msg.guild.owner;
}

function getMemberById_(msg, memberId) {
    let result = null
    msg.guild.members.cache.forEach(member => {
        if (member.id === memberId) {
            result = member;
        }
    })
    return result;
}

function memberServiceFunc() {
    return {
        getServerOwner: getServerOwner_,
        getMemberById: getMemberById_,
    }
}

module.exports = memberServiceFunc