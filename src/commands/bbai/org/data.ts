import { SfCommand, Flags } from '@salesforce/sf-plugins-core';
import { AuthInfo, Connection, Messages } from '@salesforce/core';
import { ChatCompletionFunctions, ChatCompletionRequestMessage } from 'openai';
import { ExplainResult } from '../../../shared/types';
import { CreateChatCompletion } from '../../../shared/chatcompletion';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('bbai', 'org.data');

export default class Data extends SfCommand<ExplainResult> {
  public static readonly summary = messages.getMessage('summary');
  public static readonly description = messages.getMessage('description');
  public static readonly examples = messages.getMessages('examples');

  public static readonly flags = {
    task: Flags.string({
      char: 't',
      summary: messages.getMessage('flags.task.summary'),
      description: messages.getMessage('flags.task.description')
    }),
    username: Flags.string({
      char: 'u',
      summary: messages.getMessage('flags.username.summary'),
      description: messages.getMessage('flags.username.description')
    }),
  };

  public async run(): Promise<ExplainResult> {
    const { flags } = await this.parse(Data);
    if (flags.task === undefined) {
      this.error('Please provide the task');
    }

    const chatMessages: ChatCompletionRequestMessage[] = [
      {
        'role': 'user',
        'content': flags.task
      }
    ];

    const queryData = async (query: string): Promise<string> => {
      const authInfo = await AuthInfo.create({ username: flags.username });

      const connection = await Connection.create({ authInfo });

      const result = await connection.query<{ Name: string; Id: string }>(query);

      return JSON.stringify(result);
    }

    const functions: ChatCompletionFunctions[] = [
      {
        name: 'queryData',
        description: 'A function to extract records from Salesforce via a SOQL query',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The SOQL query to execute',
            },
          },
          required: ['query'],
        }
      }
    ];


    // eslint-disable-next-line @typescript-eslint/unbound-method
    let resp = await CreateChatCompletion(chatMessages, 2048,
      functions);

    // eslint-disable-next-line no-constant-condition
    if (typeof resp === 'string') {
      this.log(resp);
    }
    else {
      const functionToCall: string = resp.name as string;
      const params = resp.parameters;
      if (functionToCall === 'queryData') {
        const query: string = params?.query as string;
        this.log('Getting more information via ' + query);
        const records = await queryData(query);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        chatMessages[0].content = 'This information has been extracted from the Salesforce database : ' + JSON.stringify(records) +
          chatMessages[0].content;
        resp = await CreateChatCompletion(chatMessages, 2048,
          []);

        this.log(resp as string);
      }
    }

    return {
      result: 'Success',
      output: resp.toString()
    };
  }
}

