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

export type FunctionDef = {
  name?: string;
  description?: string;
  parameters?: Params;
}

export type Params = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
