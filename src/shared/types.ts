export type ExplainResult = {
  result: string;
  output: string;
};

export type ChatCompletionMessage = {
  role: string;
  content: string;
  name?: string;
  function?: object;
}

export type ErrorResponse = {
  status: number;
  data: object;
};

export type ErrorResult = {
  response: ErrorResponse;
  message: string;
};

