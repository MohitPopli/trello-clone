import { Board } from "../models/Board";
import { List } from "../models/List";

type AppStore = {
  boards: Array<Board>;
  lists: Array<List>;
};

export const ApplicationStore: AppStore = {
  boards: [],
  lists: [],
};
