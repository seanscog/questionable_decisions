export type Option = {
  id: number;
  ordinal: number;
  label: string;
  fieldId: number;
};

export const controlTypes = ['display', 'text', 'number', 'radio'] as const;
export type ControlType = (typeof controlTypes)[number];
export type Question = {
  id: number;
  ordinal: number;
  displayNumber: number;
  controlType: ControlType;
  label: string;
  formPage: number;
  options: Option[];
};

export type QuestionableSchema = {
  id?: number;
  userId: number;
  title: string;
  fields: Question[];
};

export type ResponseValue = { fieldId: number; val: string };
export type QuestionableResponse = {
  formId: number;
  userId?: number;
  submittedAt?: string;
  values: ResponseValue[];
};

export const exampleSchema: QuestionableSchema = {
  userId: 0,
  title: 'Form',
  fields: [],
};
