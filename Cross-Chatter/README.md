

## Setup
Run `npm install` or `yarn`. 

npm install already ran so should be launchable with npm start. 

Bot Perms: 

- `read messages`, `send messages`
- `@everyone` role need to have the `use external emoji` permission in the channel in order to allow the bot to use all custom emotes 
- `manage messages` in order to support `deleteOnUpdate` and `messageDelete` options
- `manage permissions` in the channel in order to support using `lock` commands

To start the bot once everything is ready, you can do:

- `npm start` or `yarn start` to run the bot normally.
- `npm pm2start` or `yarn pm2start` to run the bot with pm2.
