import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { CreateCompletion } from '../../../shared/completion';
import { ExplainResult } from '../../../shared/types';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('bbai', 'explain.apex');

export default class Apex extends SfCommand<ExplainResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    topic: Flags.string({
      char: 't',
      summary: messages.getMessage('flags.topic.summary'),
      description: messages.getMessage('flags.topic.description')
    }),
  };

  public async run(): Promise<ExplainResult> {
    const { flags } = await this.parse(Apex);
    if (flags.topic === undefined) {
      this.error('Please provide the topic information');
    }

    const prompt = 'Explain the concept of ' + flags.topic +
      ' as it applies to the Apex programming language. Use technical language terms and ' +
      ' provide examples if that would help.';

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

