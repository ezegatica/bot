const keep_alive = require('./keep_alive.js')
const Discord = require('discord.js')
const client = new Discord.Client()
const weather = require('weather-js');
var veces = 0;
const PREFIX = '!';
const bananita = "587781132196773892"


// BEGIN LOGIN \\
const TOKEN = process.env.TOKENN
client.on('ready', async () => {
    console.log(client.user.username + ' prendido! \n')
    client.user.setActivity("!ayuda para ver los comandos disponibles!");
})

// END LOGIN \\

// -.-.-.-.-.-.-.-.- COMANDOS -.-.-.-.-.-.-.-.- \\

// Bloquea al Rythm de un canal especifico
client.on('message', message=>{
    if (message.channel.type === "dm") return;
    else{
    if (!message.author.bot){
    if (message.channel.id === "410136534365241345") {
      if (message.content.startsWith("!p") || message.content.startsWith("!play") || message.content.startsWith("!s") || message.content.startsWith("!skip") || message.content.startsWith("!q")){ //LA SUBE LA BAJA BOT
      if (message.content == "!punteo"){return}
          console.log(message.member.user.tag + ' >> ' + message.content)
          message.react("587778522051772436")
          message.channel.send("Escribi en <#703263587249946873>, crack")
  }
}}}})

//end


// async-await shit
client.on("message", async message => {
  if (message.channel.type === "dm") {
    if (!message.author.bot){
      console.log("DM > " + message.author.tag + " > " + message.content);
      message.author.send("Hola! Veo que trataste de mandarme un mensaje privado, aviso que no se responder por aca! \nSi necesitas ayuda haz !!ayuda en cualquier canal de voz")
      return;
      }
    }

  if (message.author.bot) return;
     switch(message.content.toLowerCase()){

  case 'ping':
  case '!ping':
    console.log(message.member.user.tag + ' >> ' + message.content)
    const m = await message.channel.send("Calculando");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`)
  break;

}})


// CON PREFIX \\

 client.on('message', message=>{
    if (message.channel.type === "dm") return;
    else{

     if (!message.author.bot){

try{
if (message.content.includes("owo") || message.content.includes("uwu")){ 
    console.log("otaku!")
   message.author.send("> " + message.content + "\n Flaco llegas a volver a decir eso y te mando a japon del baneo que te voy a pegar"); 
  }
}
  catch (err)
		{
			console.log(err)
		}

   let args = message.content.toLowerCase().substring(PREFIX.length).split(" ");
   switch(args[0]){

    // case 'ayuda':
    //     console.log(message.member.user.tag + ' >> ' + message.content)
    //     message.channel.send("Comando en prueba, disponible pronto")
    //     message.channel.send({
    //     embed: {
    //       color: 'GREEN',
    //       description: ('lorem')
          
    //     }
    //   });
    // break;

    case 'ayuda':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#141821')
          .setTitle('Gati-Bot')
          .setURL('https://gati.ga/')
          .setAuthor('by: Gati#2615', 'https://cdn.discordapp.com/icons/410136533883027457/cfe8d9ea29ac685754220e83bde0b266.png', 'https://discord.gg/cRnJZCj')
          // .setDescription('Ayuda con comandos!')
          
          // .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/VisualEditor_-_Icon_-_Help.svg/1024px-VisualEditor_-_Icon_-_Help.svg.png')
          .addField('!start', 'Jaja chiste de star wars jaja funny', true)
          .addField('!kick <usuario>','Tienen que votar la mitad mas uno de los conectados al canal de voz', true)
          .addField('!codigo', 'Codigo fuente del bot, para ver como est?? hecho', true)
            // { name: '!spam @user', value: 'Por ahora desactivado, sino esto seria alto quilombo', inline: true},
          .addField('!clima <ubicacion>', 'Muestra el clima de una ciudad o lugar', true)
          .addField('!ping', 'Revisa el ping que esta teniendo el bot actualmente', true)
          .addField('!opino', 'Opina sobre vos', true)
          .addField('!punteo', 'Te punteo', true)
          .setTimestamp()
          .setFooter('Made with love, by Gati', 'https://1.bp.blogspot.com/-44b7Xv4InJ4/T3MWo-ZkR2I/AAAAAAAACao/m7gU8rwq9TU/s1600/Ronda_Heart7.png');

        message.channel.send(exampleEmbed);

    break;

    case 'clima':
      console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
      // message.channel.send("**Comando en preparacion!**");
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
        if (args[1] === 'ayuda'){  message.channel.send("Que tratas de hacer, loquillo");
          return;
        }
        if (result.length === 0){
          message.channel.send("Por favor, "+ message.author.username + ", ingrese una ubicacion correcta.");
          return;
        }
       console.log(JSON.stringify(result[0].current, null, 2));

        var current = result[0].current;
        var location = result[0].location;
        const climaembed = new Discord.MessageEmbed()
        .setTitle("Clima")
        .setURL("https://www.npmjs.com/package/weather-js")
        .setDescription('Clima de '+ current.observationpoint)
        // .setAuthor("API Utilizada", "", "https://www.npmjs.com/package/weather-js")
        .setThumbnail(current.imageUrl)
        .setColor("#f05514")
        .addField('Timezone', "UTC " + location.timezone, true)
        .addField("Clima:", current.skytext, true)  
        .addField("Vientos", current.winddisplay, true)
        .addField('Temperatura', current.temperature + "??" + location.degreetype, true)
        .addField("Sensacion Termica", current.feelslike + "??" + location.degreetype, true )
        .addField("Humedad", current.humidity + "%", true)
        message.channel.send(climaembed)
        })

    break;


    case 'codigo':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.author.send("Codigo fuente del bot: https://repl.it/@gati/bot")
        message.channel.send("Ahi te lo envie por privado, crack")

    break;

    case 'test':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.channel.send("!test")

    break;

    case 'start':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.channel.send('>>> **Chancellor Palpatine**: Did you ever hear the tragedy of Darth Plagueis The Wise?');
            veces = 0;  
            console.log('Colector on!')

          const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
            collector.on('collect', message => {
                if (message.content.toLowerCase() == 'no') {
                  if (veces == 0){
                    message.channel.send(">>> **Chancellor Palpatine**: I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life??? He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful??? the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.");
                    veces = 1;
                        console.log('Colector off!')}}})
    break;

    case 'forcekick':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        if(message.member.user == 285156007385235467){ //ahi va el user id del "admin", te salteas la votacion
          if(message.member.voice.channel){
          if (message.mentions.members.first()){
          console.log('FORCEKICK INICIADO! Kickeando a ' + message.mentions.members.first().user.tag);

            const pete = message.mentions.members.first()
                  pete.voice.setChannel('703041951049449633') //aca el canal a donde se va
                  message.channel.send('A casa pete, con cari??o \n -Gati')
          }    
          else{
          message.channel.send('Tenes que Arrobar el chabon, pelotudo')
          }
          }else{
          message.channel.send('Metete a un canal de voz, pelotudo')
          }}
          else{
          message.channel.send('quien sos papi? jajaj')
          }
    break;


    case 'kick':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        if(message.member.voice.channel){
              const filter = (reaction, user) => {
              return reaction.emoji.name === '????' && user.id !== client.user.id;};
              let cantidad = message.member.voice.channel.members.size;
              if (message.mentions.members.first()){
              console.log('Votacion >> '+ message.mentions.members.first())
              const pete = message.mentions.members.first()
              message.react('????')
              message.awaitReactions(filter, { max: Math.floor(cantidad/2+1), time: 60000, errors: ['time'] })
              .then(collected => {
              const reaction = collected.first()
                if (reaction.emoji.name ==='????') {
                  pete.voice.setChannel('703041951049449633')
                  console.log("Expulsado >> "+ message.mentions.members.first())
                  message.channel.send('A casa pete')}
                })
              }
              
              else{
              message.channel.send('Tenes que Arrobar el chabon, pelotudo')
              }
              }
              else{
              message.channel.send('Metete a un canal de voz, pelotudo')
              } 
    break;

    case 'spam':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
          if(message.member.user == 285156007385235467){ //ahi va el user id del "admin", te salteas la votacion
          if (message.mentions.members.first()){
          if(message.mentions.members.first().voice.channel){

          const pete = message.mentions.members.first()
          const actual = message.mentions.members.first().voice.channel;
          message.channel.send('Preparate rey!')
          for(var i=1; i<=5; i++){

          pete.voice.setChannel('703041951049449633')
          console.log('a afk')

          pete.voice.setChannel(actual)
          console.log('a callejon')

          }
          }
          else{
          message.channel.send('El chabon que queres romperle las pelotas no esta en un canal de voz, pelotudo')
          }
          }else{
            message.channel.send('Tenes que Arrobar el chabon, pelotudo')
            }
            }
          else{
          message.channel.send('comando en preparacion, solo Gati tiene acceso')
          }
    break;

    case 'opino':
      var n = Math.floor(Math.random() * (8 - 1) +1);

      switch(n.toString()){ 
        case '1':
            message.reply("amigo de amigo p??ntas piola")
        break;

        case '2':
            message.reply("no juno");
        break;

        case '3':
            message.reply("te re doy")        
        break;

        case '4':
            message.reply("me caiste piola hay que vernos");
        break;

        case '5':
            message.reply("te re doy");
        break;

        case '6':
            message.reply("m caias piola pero ya no pero si pero no");
        break;
        case '7':
            message.reply("te extra??o bb");
        break;
      }
console.log(n)
    break;

    case 'memide':
        var n = Math.floor(Math.random() * (25 - 1) +1);
        var c = ', mansa tula!'
        var x = ' '
        if (n > 15){
          x = c
        }
        else{
          x = ', manso man??'
        }
        message.reply("tu pito mide "+ n+ ' cm'+ x)
    break;

    case 'gay':
        var n = Math.floor(Math.random() * (100 - 1) +1);
        message.reply('sos '+ n+ '% gay')
    break;

    case 'punteo':
      var n = Math.floor(Math.random() * (10 - 4) +4);
      var emoji;
      if (n <= 6){
          emoji = ':poop:' ;
      }
      if (n >= 9){
          emoji = ':heart_eyes_cat: :heart_eyes_cat: :heart_eyes_cat: ' ;
      }
      if (n < 9 && n > 6){
        emoji = ':smile:';
      }
          message.reply(n + ' ' +emoji)
    break;

}}}})

// SIN PREFIX \\


client.on('message', message=>{
  if(message.channel.type === "dm") return;
    else{
   if (!message.author.bot){
   switch(message.content.toLowerCase()){

    case 'lorem':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.channel.send("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae sapien arcu. Vivamus faucibus placerat eros eget viverra. Aenean ultrices luctus imperdiet. Quisque finibus nibh in pretium accumsan. Morbi mattis sagittis lectus, ut dictum nulla dignissim at. Maecenas nec vehicula nisl, eu molestie diam. Suspendisse viverra sodales hendrerit. Donec congue felis nec nisl sollicitudin accumsan. Fusce luctus facilisis sodales.")
    break;


    case 'test':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.channel.send("test")
    break;

//????????
    case 'hola':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
            if(message.member.roles.cache.has('587781132196773892')){ //ID BANANITA
                message.channel.send("HOLA REINA")
            }
            else{
                message.channel.send("HOLA REY")
            }
    break;

    case 'chau':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.channel.send("CHAU KINGA")
    break;
    
    case 'nigga':
        console.log(message.member.user.tag + ' >> ' + message.guild.name + ' >> ' + message.channel.name + ' >> \n' +message.content +'\n');
        message.reply('NO DALE NO DIGAS ESO')
    break;

}}}})


// END PRUEBAS \\
 client.login(TOKEN)
