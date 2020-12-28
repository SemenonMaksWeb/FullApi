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

export type FormDataInput = {
  regulations?: regulations[];
  regulationsServer?: any;
  error?: any
  value: any;
  params?: ValidateParamsAll;
};
export type FormData = {
  [item: string]: FormDataInput;
};
