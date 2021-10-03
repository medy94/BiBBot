const roleService = require("./roleService");
const memberService = require("./memberService");
const channelService = require("./channelService");

const roleService_ = roleService();
const memberService_ = memberService();
const channelService_ = channelService();

function serviceFunc() {
    return {
        role: roleService_,
        member: memberService_,
        channel: channelService_
    }
}

module.exports = serviceFunc;