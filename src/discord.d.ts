import {
  ApplicationCommand,
  ApplicationCommandData,
  ButtonInteraction,
  Client,
  Collection,
  CommandInteraction,
  CommandInteractionOptionResolver,
  SelectMenuInteraction,
} from "discord.js";

export class ClientCollections extends Client {
  commands?: Collection<string, Command>;
}

export interface Command extends ApplicationCommandData {
  commandExecute?: (interaction: CommandInteraction) => Promise<void>;
  buttonExecute?: (interaction: ButtonInteraction) => Promise<void>;
  selectMenuExecute?: (interaction: SelectMenuInteraction) => Promise<void>;
}
