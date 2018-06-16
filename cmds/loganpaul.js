const ytdl = require('ytdl-core');

module.exports.run = async (bot, message) => {
    message.delete();
    
    let arr = [];
    arr.push("Help me help you");
    arr.push("Girl what you trying to do");
    arr.push("'Cause I don't got a clue");
    arr.push("No, I ain't no Scooby Doo");
    arr.push("(Help me help you)");
    arr.push("'Cause I'm hungrier than you");
    arr.push("I just wanna get some food and you about to kill my mood");
    arr.push("(Help me help you)");
    arr.push("Do these jeans make me look fat?");
    arr.push("Yeah I know you want the answer, but I'm smart and that's a trap");
    arr.push("(Help me help you)");
    arr.push("Oh, and here's a random fact");
    arr.push("You still got my favorite hoodie and you need to give it back");
    arr.push("It ain't that I ain't calling back");
    arr.push("And so I'm staying out your way");
    arr.push("It ain't that I ain't got your back");
    arr.push(`But you went out of your way to make that "k" a lowercase`);
    arr.push("When you ask me my opinion");
    arr.push("I'm always sure to be your minion");
    arr.push("Girl, you're kinda like long division");
    arr.push("Everything is difficult");
    arr.push("Help me help you");

    if(message.mentions.members.first()){
            message.member.voiceChannel.join()
                .then(connection => {
                    connection.play(ytdl('https://www.youtube.com/watch?v=pT20g6lTZ-k', { filter: 'audioonly' }));
                })
                .catch(console.error);
    }

    setTimeout(function () {
        for(let x = 0; x < arr.length; x++){
            message.channel.send(arr[x]);
        }
    }, 20000);

}

module.exports.help = {
    name: "loganpaul"
};