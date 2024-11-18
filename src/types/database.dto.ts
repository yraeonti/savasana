export interface IChat {
  id: number;
  prompt: string;
  response: string;
  editpromptid?: string;
  createdat: Date;
  chat?: IChat[] | [] | undefined;
}
