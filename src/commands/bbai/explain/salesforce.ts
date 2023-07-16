
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { CreateCompletion } from '../../../shared/completion';
import { ExplainResult } from '../../../shared/types';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('bbai', 'explain.salesforce');


export default class Salesforce extends SfCommand<ExplainResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    topic: Flags.string({
      char: 't',
      summary: messages.getMessage('flags.topic.summary'),
      description: messages.getMessage('flags.topic.description')
    }),
    style: Flags.string({
      char: 's',
      summary: messages.getMessage('flags.style.summary'),
      description: messages.getMessage('flags.style.description'),
      default: 'programmer'
    }),
  };

  public async run(): Promise<ExplainResult> {
    const { flags } = await this.parse(Salesforce);
    if (flags.topic === undefined) {
      this.error('Please provide the topic information');
    }

    const prompt = 'Explain the concept of ' + flags.topic +
      ' in Salesforce to an audience made of up ' + flags.style + ' employees.';

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