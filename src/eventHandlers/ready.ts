import { ApplicationCommandData, Collection } from "discord.js";
import { ClientCollections, Command } from "../index";

export default (client: ClientCollections, commands: Command[]) => {
  client.commands = new Collection();
  for (let command of commands) client.commands.set(command.name, command);

  let applicationCommands: ApplicationCommandData[] = [];
  client.commands.forEach((command) => {
    applicationCommands.push({
      name: command.name,
      description: command.description,
      options: command.options,
    });
  });
  if (!client.application)
    throw new Error("The Client OAuth2 Application does not exist.");
  client.application.commands.set(applicationCommands);
};
