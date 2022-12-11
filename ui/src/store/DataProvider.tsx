import React, { createContext, useReducer } from "react";

const initialState: IApplicationState = {
  clients: [],
};

export const StateContext = createContext<{
  state: IApplicationState;
  dispatch: React.Dispatch<Action>;
}>(
  // @ts-ignore
  null
);

export const ACTIONS = {
  FETCH_ALL_CLIENTS: "FETCH_ALL_CLIENTS",
  ADD_CLIENT: "ADD_CLIENT",
  SEARCH_CLIENT: "SEARCH_CLIENT"
};

type Action = {
  type: keyof typeof ACTIONS;
  data: any;
};

const reducer = (state: IApplicationState, action: Action) => {
  switch (action.type) {
    case ACTIONS.FETCH_ALL_CLIENTS:
      return { ...state, clients: action.data };
    case ACTIONS.ADD_CLIENT:
      return { ...state, clients: [ ...state.clients, action.data] };
    case ACTIONS.SEARCH_CLIENT:
      return { ...state, clients: [ ...action.data ] }
    default:
      return state;
  }
};

export default function DataProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
