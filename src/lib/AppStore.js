import { createStore } from "redux";

const appStore = createStore((state = {}, action) => {
  // We'll define the functionality for our reducer here.
  switch (action.type) {
    case "ADD_TO_LIST":
      return {
        ...state,
        searchTerms: [...state.searchTerms, action.item],
      };
    default:
      return {
        ...state,
      };
  }
}, {
  searchTerms: [],
});

export default appStore;