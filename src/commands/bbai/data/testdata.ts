import { ChatCompletionRequestMessage } from 'openai';
import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { Messages } from '@salesforce/core';
import { ExplainResult } from '../../../shared/types';
import { CreateChatCompletion } from '../../../shared/chatcompletion';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('bbai', 'data.testdata');

export default class TestData extends SfCommand<ExplainResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    fields: Flags.string({
      char: 'f',
      summary: messages.getMessage('flags.fields.summary'),
      description: messages.getMessage('flags.fields.description')
    }),
    recordformat: Flags.string({
      char: 'r',
      summary: messages.getMessage('flags.recordformat.summary'),
      description: messages.getMessage('flags.recordformat.description'),
      default: 'csv'
    }),
    number: Flags.integer({
      char: 'n',
      summary: messages.getMessage('flags.number.summary'),
      description: messages.getMessage('flags.number.description'),
      default: 5
    }),
  };

  public async run(): Promise<ExplainResult> {
    const { flags } = await this.parse(TestData);
    if (flags.fields === undefined) {
      this.error('Please provide the fields');
    }

    if ((flags.number > 50) || (flags.number < 0)) {
      this.log('Invalid number value - resetting to 5');
      flags.number = 5;
    }

    const maxTokens = 3500;

    const chatMessages: ChatCompletionRequestMessage[] = [
      {
        'role': 'system',
        'content': 'You are a utility library that generates test data in CSV, JSON or text format. ' +
          'You do not output any messages after the records - just the data.' +
          'You generate realistic data based on your understanding of the field type. ' +
          'For CSV format, you generate a header line with the field names. ' +
          'Format that data suitable for saving in a file of that type.'
      },
      {
        'role': 'user',
        'content': 'Generate ' + (flags.number as unknown as string) + ' records in ' + flags.recordformat + ' format. The records have the following fields and their associated types : ' + flags.fields
      }
    ];

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const resp = await CreateChatCompletion(chatMessages, maxTokens);

    this.log(messages.getMessage('info.results'));
    this.log(resp);

    return {
      result: 'Success',
      output: resp
    };
  }
}

