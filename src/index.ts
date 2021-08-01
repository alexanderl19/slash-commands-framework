import {
  ApplicationCommandData,
  ButtonInteraction,
  Client as DiscordClient,
  ClientOptions,
  Collection,
  CommandInteraction,
  Intents,
  SelectMenuInteraction,
} from "discord.js";
import ready from "./eventHandlers/ready";
import getCommand from "./util/getCommand";

export class ClientCollections extends DiscordClient {
  commands?: Collection<string, Command>;
}

export interface Command extends ApplicationCommandData {
  commandExecute?: (interaction: CommandInteraction) => Promise<void>;
  buttonExecute?: (interaction: ButtonInteraction) => Promise<void>;
  selectMenuExecute?: (interaction: SelectMenuInteraction) => Promise<void>;
}

export class Client {
  constructor(token: string, commands: Command[], options?: ClientOptions) {
    const client: ClientCollections = new DiscordClient(
      options || {
        intents: new Intents(512),
      }
    );

    client.once("ready", () => {
      ready(client, commands);
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isMessageComponent()) return;
      if (!client.commands) return;

      const command = getCommand(client.commands, interaction);
      if (!command) return;

      try {
        if (interaction.isCommand() && command.commandExecute) {
          await command.commandExecute(interaction);
        }

        if (interaction.isButton() && command.buttonExecute) {
          await command.buttonExecute(interaction);
        }

        if (interaction.isSelectMenu() && command.selectMenuExecute) {
          await command.selectMenuExecute(interaction);
        }
      } catch (error) {
        console.error(error);
      }
    });

    client.login(token);
  }
}
