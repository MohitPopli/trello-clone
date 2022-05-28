import type { UserComment } from "./Comment";

type Card = {
    id: string;
    cardTitle: string;
    cardDescription: string;
    listId: string;
    comments: Array<UserComment>;
    createdBy: string;
}

export type { Card };