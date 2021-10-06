import { DraggableLocation } from 'react-beautiful-dnd';

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

interface BaseCard {
  name: string;
  idList: string;
  pos: number;
  idBoard: string;
}

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

export type OnDragEndHelperFn = (
  boardData: BoardInterface,
  sourceData: DraggableLocation,
  destinationData: DraggableLocation,
  updateBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
) => void;

export type AddCardHelper = (
  boardData: BoardInterface,
  cardObject: BaseCard,
  listData: any,
  updateBoard: React.Dispatch<React.SetStateAction<BoardInterface | null>>,
) => void;
