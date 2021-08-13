import React from 'react';
import { CardInterface } from '../../types';
import Card from './Card';

interface Props {
  cards: CardInterface[];
  idList: string;
}

const CardList = React.memo(({ cards, idList }: Props) => (
  <>
    {cards.map((card, index) => (
      <Card key={card._id} card={card} index={index} idList={idList} />
    ))}
  </>
));

export default CardList;
