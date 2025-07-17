import { Extension } from '../../domain-exception';

export type ErrorResponseBody = {
  errorsMessages: Extension[];
};
