import type { List } from "./List";

type Board = {
    id: string;
    boardName: string;
    lists: Array<List>;
};

export type { Board };