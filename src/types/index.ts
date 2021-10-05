interface CommonData {
  _id: string;
  name: string;
}

export enum MemberType {
  normal = 'normal',
  admin = 'admin',
  owner = 'owner',
}

export interface MemberInfo {
  idMember: string;
  memberType: MemberType;
  initials: string;
  fullName: string;
  username: string;
}

export interface BoardInterface extends CommonData {
  lists: ListInterface[];
  idMemberCreator: string;
  members: [MemberInfo];
  color: BoardColorKeys;
}

export interface ListInterface extends CommonData {
  idBoard: string;
  pos: number;
  cards: CardInterface[];
}

export interface CardInterface extends CommonData {
  idList: string;
  pos: number;
  idBoard: string;
}

// export enum ProfilePopoverContentType {
//   main = 'main',
//   levelChange = 'levelChange',
//   leave = 'leave',
//   remove = 'remove',
// }

// export enum BoardColorKeys {
//   BLUE = 'blue',
//   ORANGE = 'orange',
//   GREEN = 'green',
//   RED = 'red',
//   PURPLE = 'purple',
//   PINK = 'pink',
//   LIME = 'lime',
//   SKY = 'sky',
//   GREY = 'grey',
// }

export type BoardColorKeys =
  | 'blue'
  | 'orange'
  | 'green'
  | 'red'
  | 'purple'
  | 'pink'
  | 'lime'
  | 'sky'
  | 'grey';

export type ExtendColorKeys = 'default';

export type ColorKeys = BoardColorKeys | ExtendColorKeys;

export interface Params {
  [key: string]: string;
}
