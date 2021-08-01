import { DiscordjsOptions } from "./discordjs/discordjs";
import discordjs from "./discordjs/discordjs";

export class Client {
  constructor(discordjsOptions: DiscordjsOptions) {
    const token = discordjsOptions.token;
    const commands = discordjsOptions.commands;
    const options = discordjsOptions.options;
    discordjs(token, commands, options);
  }
}
