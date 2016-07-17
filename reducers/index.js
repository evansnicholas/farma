import { combineReducers } from "redux";
import data from "./data";
import ui from "./ui";
import order from "./order";

const appReducer = combineReducers({
  data: data,
  order: order,
  ui: ui
})

export default appReducer;
