interface CommonData {
  name: string;
  pos: number;
}

export interface BoardInterface {
  _id: string;
  name: string;
}

export interface ListData extends CommonData {}

export interface ListInterface extends ListData {
  _id: string;
  cards: CardInterface[];
}

export interface CardData extends CommonData {
  idList: string;
}

export interface CardInterface extends CardData {
  _id: string;
  idList: string;
}
