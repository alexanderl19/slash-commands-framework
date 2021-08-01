import { Collection, MessageComponentInteraction } from "discord.js";
import { Command } from "../discordjs";

export default (
  commands: Collection<string, Command>,
  interaction: MessageComponentInteraction
) => {
  let command;
  if (interaction.isCommand()) {
    command = commands.get(interaction.commandName);
  } else {
    const messageInteraction = interaction.message.interaction;
    if (!messageInteraction) return;
    command = commands.get(
      // @ts-ignore
      // The command name property if `commandName` on MessageInteraction and `name` APIMessageInteraction
      messageInteraction.commandName || messageInteraction.name
    );
  }

  return command;
};
