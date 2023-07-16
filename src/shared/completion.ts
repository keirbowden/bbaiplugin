import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type ErrorResponse = {
  status: number;
  data: object;
};

type ErrorResult = {
  response: ErrorResponse;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export async function CreateCompletion(prompt: string, maxTokens: number, temperature: number): Promise<string> {

  let result = '';

  if (configuration.apiKey === undefined) {
    result = 'Error : Missing Api Key';
  }
  else
    try {
      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        // eslint-disable-next-line camelcase
        max_tokens: maxTokens,
        prompt,
        temperature
      });

      result = (completion.data.choices[0].text as string);

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