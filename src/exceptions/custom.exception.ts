export class CustomException extends Error {
  service: string;
  message: string;
  errorCode: string;
  path: string;
  status: number;
  details: object;
  // for axios Errors
  response?: {
    name: string;
    service: string;
    message: string;
    errorCode: string;
    path: string;
    status: number;
    details: object;
  };

  constructor(customExceptionBody: CustomExceptionBody, message?: string) {
    super(message || customExceptionBody.message);

    this.message = message || customExceptionBody.message;
    this.service = customExceptionBody.service || '';
    this.errorCode = customExceptionBody.errorCode;
    this.status = customExceptionBody.status;
  }
}
