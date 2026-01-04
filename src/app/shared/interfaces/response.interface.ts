export interface IResponseMessage {
  status: IResponseStatus;
  header: string;
  msg: any;
  errorMessage?: unknown;
  totalPages?: any;
}

export type IResponseStatus  = 200 | 201 | 404 | 500
