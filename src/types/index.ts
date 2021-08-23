interface CommonData {
  _id: string;
  name: string;
}

export interface BoardInterface extends CommonData {
  lists: ListInterface[];
}

export interface ListInterface extends CommonData {
  idBoard: String;
  pos: number;
  cards: CardInterface[];
}

export interface CardInterface extends CommonData {
  idList: string;
  pos: number;
}
