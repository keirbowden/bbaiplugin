/* eslint-disable camelcase */
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { ErrorResult } from './types';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function CreateChatCompletion(messages: ChatCompletionRequestMessage[], maxTokens = 256): Promise<string> {
  let result = '';

  if (configuration.apiKey === undefined) {
    result = 'Error : Missing Api Key';
  }
  else
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 1,
        max_tokens: maxTokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      result = (response.data.choices[0].message?.content as string);
    }
    catch (error) {
      const errRes: ErrorResult = (error as ErrorResult);
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