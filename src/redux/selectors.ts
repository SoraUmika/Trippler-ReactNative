import State from "./state";

export const accentColor = (state: State) => state.theme.accentColor;

export const businesses = (state: State) => state.businesses;

export const collectionItems = (state: State) => state.collection.items;

export const recomFeed = (state: State) => state.recommendation.feeds;

export const currentRecomIndex = (state: State) => state.recommendation.currentIndex;
