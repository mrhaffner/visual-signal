export interface CardInterface {
  _id: string;
  content: string;
  index: number;
}

export interface ListInterface {
  _id: string;
  title: string;
  index: number;
  cards: CardInterface[];
}

export interface FormData {
  input: string;
}

export interface ParentData {
  index: number;
  listId?: string;
}

export interface OutputData extends FormData, ParentData {}
