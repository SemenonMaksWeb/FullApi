export type ValueCheck = {
  value1: string;
  value2: string;
  valueSet: string;
};
export type ValidateParamsAll = {
  minLength?: number;
  maxLength?: number;
  RegExp?: RegExp;
  valueTrue: ValueCheck;
  valueFalse: ValueCheck;
};
export type ErrorObject = {
  text: string;
  active: boolean;
  type?: 'server';
};
export type regulations =
  | 'RegExp'
  | 'Undefined'
  | 'valueTrue'
  | 'valueFalse'
  | 'MinLength'
  | 'MaxLength';

const res: regulations[] = ['RegExp', 'MinLength'];

export type FormDataInput ={
  regulations: regulations[],
  regulationsServer?: any,
  error: {
    [item:string]:ErrorObject
  },
  value: string,
  params?: ValidateParamsAll,
}
export type FormData = {
  [item:string]: FormDataInput,
}
const a:FormData = {
  d: {error:{MinLength:{text:"d",active:false }} , regulations:["MinLength"] ,value: "" }
  }
 