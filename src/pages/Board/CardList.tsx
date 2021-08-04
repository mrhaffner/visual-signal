import React from 'react';
import { CardInterface } from '../../types';
import Card from './Card';

interface Props {
  cards: CardInterface[];
  listId: string;
  deleteCard: (listId: string, cardId: string) => void;
}

const CardList = React.memo(({ cards, listId, deleteCard }: Props) => (
  <>
    {cards.map((card, index) => (
      <Card
        key={card._id}
        card={card}
        index={index}
        listId={listId}
        deleteCard={deleteCard}
      />
    ))}
  </>
));

export default CardList;
