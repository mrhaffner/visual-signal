import React from 'react';
import { CardInterface } from '../../types';
import Card from './Card';

interface Props {
  cards: CardInterface[];
  listId: string;
}

const CardList = React.memo(({ cards, listId }: Props) => (
  <>
    {cards.map((card, index) => (
      <Card key={card._id} card={card} index={index} listId={listId} />
    ))}
  </>
));

export default CardList;
