export interface DataColumn {
    id: string;
    title: string;
    cards: [DataCard]
}

export interface DataCard {
    id: string;
    title: string;
}