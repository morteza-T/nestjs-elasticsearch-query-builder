type CustomExceptionBody = {
  service?: string;
  message: string;
  errorCode: string;
  path?: string;
  status: number;
  details?: object;
  response?: object;
};
