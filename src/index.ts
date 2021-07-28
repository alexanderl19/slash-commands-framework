import * as Discord from "discord.js";
import { ClientCollections, Command } from "./discord";
import { ApplicationCommandData, ClientOptions } from "discord.js";
import * as fs from "fs";

export class Client {
  constructor(token: string, commands: [Command], options: ClientOptions) {
    const client: ClientCollections = new Discord.Client(
      options || {
        intents: new Discord.Intents(512),
      }
    );
    client.commands = new Discord.Collection();
    for (let command of commands) client.commands.set(command.name, command);

    const commandFolders = fs.readdirSync("./commands");
    client.once("ready", () => {
      let commands: ApplicationCommandData[] = [];
      client.commands!.forEach((command) => {
        commands.push({
          name: command.name,
          description: command.description,
          options: command.options,
        });
      });
      if (!client.application)
        throw new Error("The Client OAuth2 Application does not exist.");
      client.application.commands.set(commands);
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isMessageComponent()) return;

      if (interaction.isCommand()) {
        const command = client.commands!.get(interaction.commandName);

        if (command && command.commandExecute)
          try {
            await command.commandExecute(interaction);
          } catch (error) {
            console.error(error);
          }
      }

      if (interaction.isButton()) {
        const command = client.commands!.get(
          interaction.message.interaction.commandName
        );

        if (command && command.buttonExecute)
          try {
            await command.buttonExecute(interaction);
          } catch (error) {
            console.error(error);
          }
      }

      if (interaction.isSelectMenu()) {
        const command = client.commands!.get(
          interaction.message.interaction.commandName
        );

        if (command && command.selectMenuExecute)
          try {
            await command.selectMenuExecute(interaction);
          } catch (error) {
            console.error(error);
          }
      }
    });

    client.login(process.env.TOKEN);
  }
}
