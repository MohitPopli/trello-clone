import type { Card } from "./Card";

type List = {
    id: string;
    boardId: string;
    listTitle: string;
    cards: Array<Card>;
    createdAt: string;
    modifiedAt: string;
    createdBy: string;
}

export type { List };