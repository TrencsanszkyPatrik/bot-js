const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const command = require('./command');
const moment = require('./lib/moment/moment.min.js');

require('events').EventEmitter.defaultMaxListeners = 20;

client.on('guildMemberAdd', member => {
    const welcome = member.guild.channels.cache.find(ch => ch.name === 'welcome')
    welcome.send({embed: {color: "#32CD32", description: `Helló ${member}, üdv a ***Attack on Titan Szerepjáték*** szerverén! Kérlek, olvasd el a #szabályok szoba tartalmát, illetve ne felejtsd el meglesni a #történet-áttekintő szobát sem, ahol az eddigi történéseket tudod pótolni. Érezd jól magad, a #kantin mindig tárva-nyitva áll, ha társaságra vágynál ;)`}})
  })
  
  client.on("guildMemberRemove", member => {
     const welcome = member.guild.channels.cache.find(ch => ch.name === 'welcome')
    welcome.send({embed: {color: "#32CD32", description: `Viszlát ${member}! `}})
  })

client.on('ready', () => {
    console.log(`Fut a bot!`)

    require('events').EventEmitter.defaultMaxListeners = 25;

  // HELPEK

    command(client, 'harcrendszer', (message) => {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#32CD32')
            .setTitle('Harcrendszerre vonatkozó szabályok')
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
            .addField('Alap szábályok' , ':dagger:Támadás és sebzés rendszere: Dicey-val történik a sorsolás:\n :dagger: 1-2ig a sebzés nem ér célba sértetlen marad mindkét fél.\n :dagger:3-4ig terjedő skálán gyenge sebzés. Könnyű sérülés okozható csak.\n :dagger:5-6ig okozható a súllyos sérülés illetve mérhető a végső ütes ami eldönti ki nyerhet egy harcban.\n :dagger:Ha dobni szeretnél jelezd egy adminak vagy alapítónak!\n :dagger:Akinek a több sebzés pont jön ki az nyerte a küzdelmet.\n :dagger:Döntetlen esetén Coin dobással ítéljük meg a győztest.')
            .addField('Plusz módosítók', ':dagger:Max kard +2 pont előny Dicey dobásnál.\n :dagger:Level 5. ODM gear +1 pont előny Dicey dobásnál. \n:dagger:Level 10.ODM gear +2pont előny Dicey dobásnál. \n:dagger:Level 15. ODM gear +3 pont előny Dicey dobásnál. \n:dagger:Plusz pontokat felhasználása annyit tesz hogy a dobott számodhoz hozzá tudod adni őket ezzel növelve az összeget azaz akár a győzelmedhez is vezethetnek ha a kellő fejlesztések meg vannak.')
            .setTimestamp()
            .setFooter("Jó játékot!")
            message.channel.send(exampleEmbed)
    })

  command(client, 'alakváltószabályok', (message) => {
      const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#32CD32')
        .setTitle("Alakváltó szabályok")
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
        .addField('Alakváltókra vonatkozó szabályok', 'Alakváltókra vonatkozó szabályok\n :bow_and_arrow:  Az alakváltó titán karaktereket egyessével fogjuk kiosztani, mindig előzetesen kockadobással kisorsolva a következő titánt. A 9. titánnal akárhogy is, de bevárjuk az animét.\n :bow_and_arrow: Ennek menete egy pályázat lesz. A #titán-pályázat szobába tudtok majd fejenként egy karakterlapot beküldeni, arról az OC-ról, akinek az erőt szánjátok. Meglévő karakter esetén átírás szükséges. A pályázatra való jelentkezés ideje egy hét.\n :bow_and_arrow: A karakterlapnak tartalmaznia kell többek között a használó történetét, az erő megöröklésének mikéntjét, illetve a használó szándékait, céljait. Minél kidolgozottabb egy lap, annál jobb esélyekkel indul a titánért.\n :bow_and_arrow: A szavazás egész szerveres lesz, mindenki annyi karakterlapra voksol, amennyit szimpatikusnak talál. Ha az egy hét leteltével több is az első helyen végez, az admin-csapat 24 órán belül eldönti, ki kapja meg az erőt.')
        .setTimestamp()
        .setFooter("Jó játékot!")
        message.channel.send(exampleEmbed)
  })

  command(client, 'alapok', (message) => {
      const exampleEmbed = new Discord.MessageEmbed()
      .setColor(" ")
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
      .addField('Hogyan lehet csatlakozni az RPbe?', ':shield: A szerepjátékba való becsatlakozáshoz nincs más dolgod, mint összerakni egy karaktert, bemutatni a #karakterlap-bemutató szobában, majd a Tupperbox BOT használatával létrehozni őt a #karakter-generátor-ban. Ehhez a szobában kitűzött üzenetek között találod a pontos instrukciókat, illetve segítséget kérhetsz bármelyik Alapító, Admin, illetve Security ranggal rendelkező tagoktól!')
      .setTimestamp()
      .setFooter("Jó játékot!")
      message.channel.send(exampleEmbed)
  })

    // BAN

    command(client, 'ban', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${tag} Sikeresen bannoltad!`)
          } else {
            message.channel.send(`${tag} Jelölj meg valakit, akit bannolni szeretnél!`)
          }
        } else {
          message.channel.send(
            `${tag} Nincs engedélyed a parancs használatára!`
          )
        }
      });


      // KICK

      command(client, 'kick', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('KICK_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${tag} Sikeresen kickelted!`)
          } else {
            message.channel.send(`${tag} Jelölj meg valakit, akit kickelni szeretnél!`)
          }
        } else {
          message.channel.send(
            `${tag} Nincs engedélyed a parancs használatára!`
          )
        }
      })
    });

client.login(config.token)