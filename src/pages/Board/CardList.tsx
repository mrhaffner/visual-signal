import React from 'react';
import { CardInterface } from '../../types';
import Card from './Card';

interface Props {
  cards: CardInterface[];
}

const CardList = React.memo(({ cards }: Props) => (
  <>
    {cards.map((card, index) => (
      <Card key={card._id} card={card} index={index} />
    ))}
  </>
));

export default CardList;
