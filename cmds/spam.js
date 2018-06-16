module.exports.run = (bot, message, args) => {
    let is = false;
    if(args[args.length-1] === "-i"){
        args.pop();
        is = true;
    }
    let slice = args.slice(1);
    let join = slice.join(" ");
    let n = parseInt(args[0]);
    
    if(isNaN(n)) return message.channel.send("Usage: t:spam <times repeated> <message>");

    if(is === true){
        let array = [];
        for(i = 0; i < n; i++){
            array.push(join);
        }
        message.channel.send(array);
    }else{
        for(i = 0; i < n; i++){
            message.channel.send(join);
        }
    }
}
module.exports.help = {
    name: "spam"
}