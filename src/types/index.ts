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

export interface ListData {
  title: string;
  index: number;
}

export interface CardData {
  content: string;
  index: number;
  listId: string;
}
