interface CommonData {
  name: string;
  pos: number;
}

export interface BoardInterface {
  _id: string;
  name: string;
  lists: ListInterface[];
}

export interface ListData extends CommonData {
  idBoard: string;
}

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
