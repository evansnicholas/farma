import { combineReducers } from "redux";
import data from "./data";
import ui from "./ui";

const appReducer = combineReducers({
  data: data,
  ui: ui
})

export default appReducer;
