import { Board } from "../models/Board";
import { Card } from "../models/Card";
import { UserComment } from "../models/Comment";
import { List } from "../models/List";

type AppStore = {
  boards: Array<Board>;
  lists: Array<List>;
  cards: Array<Card>;
  comments: Array<UserComment>;
};

export const ApplicationStore: AppStore = {
  boards: [],
  lists: [],
  cards: [],
  comments: [],
};
