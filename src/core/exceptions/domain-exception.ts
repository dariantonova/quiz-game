import { DomainExceptionCode } from './domain-exception-code';

export class Extension {
  constructor(
    public key: string,
    public message: string,
  ) {}
}

export class DomainException extends Error {
  message: string;
  code: DomainExceptionCode;
  extensions: Extension[];
  info?: any;

  constructor(errorInfo: {
    message: string;
    code: DomainExceptionCode;
    extensions?: Extension[];
    info?: any;
  }) {
    super(errorInfo.message);
    this.message = errorInfo.message;
    this.code = errorInfo.code;
    this.extensions = errorInfo.extensions || [];
    this.info = errorInfo.info;
  }
}
