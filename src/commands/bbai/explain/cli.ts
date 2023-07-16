import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { ExplainResult } from '../../../shared/types';
import { CreateCompletion } from '../../../shared/completion';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('bbai', 'explain.cli');

export default class Cli extends SfCommand<ExplainResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    command: Flags.string({
      char: 'c',
      summary: messages.getMessage('flags.command.summary'),
      description: messages.getMessage('flags.command.description')
    }),
  };

  public async run(): Promise<ExplainResult> {
    const { flags } = await this.parse(Cli);
    if (flags.command === undefined) {
      this.error('Please provide the command information');
    }

    const prompt = 'Explain the purpose of Salesforce CLI command ' + flags.command +
      ' and how it might be used in a devops process. Include an example execution of the command.';
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const resp = await CreateCompletion(prompt, 256, 0.6);

    this.log(messages.getMessage('info.results'));
    this.log(resp);

    return {
      result: 'Success',
      output: resp
    };
  }
}
