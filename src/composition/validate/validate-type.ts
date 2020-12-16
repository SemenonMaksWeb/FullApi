export type ValueCheck = {
  value1: string;
  value2: string;
  valueSet: string;
};
export type ErrorObject = {
  text: string;
  active: boolean;
  type?: 'server';
};
// export type ErrorObjectAll = {
//   RegExp?: ErrorObject;
//   Undefined?: ErrorObject;
//   valueTrue?: ErrorObject;
//   valueFalse?: ErrorObject;
//   MinLength?: ErrorObject;
//   MaxLength?: ErrorObject;
//   // ?: ErrorObject,
// };
// export type ValidateParamsAll = {
//   minLength?: number;
//   maxLength?: number;
//   RegExp?: RegExp;
//   valueTrue: ValueCheck;
//   valueFalse: ValueCheck;
// };
// export enum  regulations {
//   "RegExp"="RegExp",
//   "Undefined"="Undefined",
//   "valueTrue"="valueTrue",
//   "valueFalse"="valueFalse",
//   "MinLength"="MinLength",
//   "MaxLength"="MaxLength",
// }
