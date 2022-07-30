import { ICommand } from "wokcommands";

//ping command 
export default {
    category: 'game',
    description: 'Replies with pong',

    slash: "both",
    testOnly: true,

    callback: ({ }) => {
        return 'pong'    
    },
} as ICommand
// works with both !ping & /ping