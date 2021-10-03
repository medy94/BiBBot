function getRoleByName_(name, msg) {
    if (msg && msg.guild && msg.guild.roles) {
        let result;
        msg.guild.roles.cache.forEach(role => {
            if (role.name.toLowerCase() === name.toLowerCase()) {
                result = role;
            }
        });
        return result;
    }
    return undefined;
}

function userHasRole_(member, role) {
    return member.roles.cache.has(role.id);
}

function memberHasClassRole_(member) {
    let result = undefined;
    member.roles.cache.forEach(role => {
        for (let i = 0; i < wowKlassen.length; i++) {
            if(role.name === wowKlassen[i]) {
                result = role;
            }
        }
    });
    return result;
}

function memberHasRoleRole_(member) {
    let result = undefined;
    member.roles.cache.forEach(role => {
        for (let i = 0; i < roleNames.length; i++) {
            if(role.name === roleNames[i]) {
                result = role;
            }
        }
    });
    return result;
}

function userHasRoleByName_(member, name) {
    let result = false;

    if (member && member.roles && member.roles.cache) {
        member.roles.cache.forEach(currentRole => {
            if (currentRole.name.toLowerCase() === name.toLowerCase()) {
                result = true;
            }
        });
    }
    return result;
}

async function addOrRemoveRole_(msg, roleName) {
    if (msg && msg.member && msg.member.roles) {
        const role = getRoleByName_(roleName, msg);
        if(role === undefined) {
            console.log('Ich konnte die Rolle ' + roleName + ' nicht finden.');
            msg.reply("Etwas ist schief gegangen");
            return;
        }
        let gotRoleAlready = msg.member.roles.cache.has(role.id);

        if (gotRoleAlready) {
            await msg.member.roles.remove(role);
            msg.reply("ich habe die Rolle **" + roleName + "** von dir entfernt.");
        } else {
            await msg.member.roles.add(role);
            msg.reply("ich habe dir die Rolle **" + roleName + "** hinzugefügt.");
        }
    }
}

async function createRole_(guild, roleName, reasonn) {
    if (guild && guild.roles) {
        return await guild.roles.create({
            data: {
                name: roleName,
                //color: 'BLUE',
            },
            reason: reasonn,
        });
    }
}

function roleServiceFunc() {
    return {
        getRoleByName: getRoleByName_,
        userHasRole: userHasRole_,
        userHasRoleByName: userHasRoleByName_,
        addOrRemoveRole: addOrRemoveRole_,
        createRole: createRole_,
    }
}

module.exports = roleServiceFunc