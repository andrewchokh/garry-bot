interface EventData {
    name: import('discord.js').Events,
    isOnce: boolean,
    execute(...args : any[]): Promise<void>;
}