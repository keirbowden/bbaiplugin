/* eslint-disable camelcase */
import { ChatCompletionFunctions, ChatCompletionRequestMessage, Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';
import { ErrorResult, FunctionDef } from './types';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function CreateChatCompletion(messages: ChatCompletionRequestMessage[], maxTokens = 256, functions = ([] as ChatCompletionFunctions[])): Promise<string | FunctionDef> {
  let result: string | FunctionDef = '';
  if (configuration.apiKey === undefined) {
    result = 'Error : Missing Api Key';
  }
  else
    try {
      const props: CreateChatCompletionRequest = {
        model: 'gpt-3.5-turbo-0613',
        messages,
        temperature: 1,
        max_tokens: maxTokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      };

      if (0 !== functions.length) {
        props['functions'] = functions;
      }

      const response = await openai.createChatCompletion(props);
      // eslint-disable-next-line no-console
      console.log(response.data.choices[0]);
      if (response.data.choices[0].finish_reason === 'stop') {
        result = response.data.choices[0].message?.content as string;
      }
      else if (response.data.choices[0].finish_reason === 'function_call') {
        result = {
          name: response.data.choices[0].message?.function_call?.name,
          parameters: JSON.parse(response.data.choices[0].message?.function_call?.arguments as string) as object
        } as FunctionDef;
      }
    }
    catch (error) {
      const errRes: ErrorResult = (error as ErrorResult);
      // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-member-access
      console.error(errRes.response.data ?? errRes.message);
      if (errRes.response) {
        if (errRes.response.status === 401) {
          result = 'Error: Authentication failed - check secret key/organistion';
        }

      } else {
        result = 'Error : ' + errRes.message;
      }
    }

  return result;
}