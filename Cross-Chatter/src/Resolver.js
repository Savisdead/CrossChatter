'use strict';

const REGEXES = {
    userMention: /<@!?([0-9]+)>$/,
    roleMention: /<@&([0-9]+)>$/,
    channelMention: /<#([0-9]+)>$/,
    id: /^[0-9]+$/,
};


class Resolver {
    
    static user(client, args) {
       
        if (!args.length) {
            throw new Error('RESOLVER [user]: All the arguments are either not given or false.');
        }
       
        if (!Array.isArray(args) ) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const { users } = client;

        const mention = REGEXES.userMention.exec(args[0] );

        const user = ( (mention && mention[1] ) && users.get(mention[1] ) ) 
            || (REGEXES.id.test(args[0] ) && users.get(args[0] ) ) 
            || (args.all.indexOf('#') > -1 && users.find(u => `${u.username}#${u.discriminator}` === args.all) ) 
            || users.find(u => u.username === args.all) 
            || users.find(u => u.username.toLowerCase() === args.lower) 
            || users.find(u => u.username.includes(args.all) ) 
            || users.find(u => u.username.toLowerCase().includes(args.lower) ) 
            || null;

        return user; 
    }

    
    static member(guild, args) {
       
        if (!guild || !args.length) {
            throw new Error('Not Enough Arguements');
        }
        
        if (!Array.isArray(args) ) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const { members } = guild;

        const mention = REGEXES.userMention.exec(args[0] );

        const member = ( (mention && mention[1] ) && members.get(mention[1] ) ) 
            || (REGEXES.id.test(args[0] ) && members.get(args[0] ) ) 
            || (args.all.indexOf('#') > -1 && members.find(m => `${m.username}#${m.discriminator}` === args.all) ) 
            || members.find(m => m.username === args.all) 
            || members.find(m => m.nick === args.all) 
            || members.find(m => m.username.toLowerCase() === args.lower) 
            || members.find(m => m.nick && m.nick.toLowerCase() === args.lower) 
            || members.find(m => m.username.toLowerCase().includes(args.lower) ) 
            || members.find(m => m.nick && m.nick.toLowerCase().includes(args.lower) ) 
            || null; 

        return member; 
    }


    static role(guild, args) {
        
        if (!guild || !args.length) {
            throw new Error('Not Enough Arguements');
        }

        
        if (!Array.isArray(args) ) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const { roles } = guild;

        const mention = REGEXES.roleMention.exec(args[0] );

        const role = ( (mention && mention[1] ) && roles.get(mention[1] ) ) 
            || (REGEXES.id.test(args[0] ) && roles.get(args[0] ) ) 
            || roles.find(m => m.name === args.all) 
            || roles.find(m => m.name.toLowerCase() === args.lower) 
            || roles.find(m => m.name.includes(args.all) ) 
            || roles.find(m => m.name.toLowerCase().includes(args.lower) ) 
            || null; 

        return role;
    }


    static channel(guild, args) {
        
        if (!guild || !args.length) {
            throw new Error('Not Enough Arguements');
        }

        
        if (!Array.isArray(args) ) {
            args = `${args}`.split(' ');
        }

        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();
        const { channels } = guild;

        const mention = REGEXES.channelMention.exec(args[0] );

        const channel = ( (mention && mention[1] ) && channels.get(mention[1] ) )
            || (REGEXES.id.test(args[0] ) && channels.get(args[0] ) )
            || channels.find(c => c.name === args.all) 
            || channels.find(c => c.name.toLowerCase() === args.lower) 
            || channels.find(c => c.name.includes(args.all) ) 
            || channels.find(c => c.name.toLowerCase().includes(args.lower) ) 
            || null; 

        return channel;
    }


    static guild(client, args) {
        
        if (!args.length) {
            throw new Error('RESOLVER [guild]: All the arguments are either not given or false.');
        }

        const { guilds } = client;
        args.all = args.join(' ');
        args.lower = args.all.toLowerCase();

        const guild = (REGEXES.id.test(args[0] ) && guilds.find(g => g.id === args[0] ) ) 
            || guilds.find(g => g.name === args.all) 
            || guilds.find(g => g.name.toLowerCase() === args.lower) 
            || guilds.find(g => g.name.includes(args.all) ) 
            || guilds.find(g => g.name.toLowerCase().includes(args.lower) ) 
            || null;

        return guild;
    }
}

exports.Resolver = Resolver;
