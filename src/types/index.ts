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
}

export interface ListInterface extends CommonData {
  idBoard: string;
  pos: number;
  cards: CardInterface[];
}

export interface CardInterface extends CommonData {
  idList: string;
  pos: number;
}
