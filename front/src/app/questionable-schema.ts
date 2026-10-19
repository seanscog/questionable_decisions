// export class Question<T> {
//   value: T | undefined;
//   key: string;
//   label: string;
//   required: boolean;
//   ordinal: number;
//   controlType: string;
//   type: string;
//   options: { key: string; value: string }[];
//   constructor(
//     options: {
//       value?: T;
//       key?: string;
//       label?: string;
//       required?: boolean;
//       ordinal?: number;
//       controlType?: string;
//       type?: string;
//       options?: { key: string; value: string }[];
//     } = {},
//   ) {
//     this.value = options.value;
//     this.key = options.key || '';
//     this.label = options.label || '';
//     this.required = !!options.required;
//     this.ordinal = options.ordinal === undefined ? 1 : options.ordinal;
//     this.controlType = options.controlType || '';
//     this.type = options.type || '';
//     this.options = options.options || [];
//   }
// }
export type Question = {
  id: number;
  ordinal: number;
  displayNumber: number;
  controlType: string;
  label: string;
  formPage: number;
  options: string[];
};

export type QuestionableSchema = {
  id: number;
  title: string;
  fields: Question[];
};
