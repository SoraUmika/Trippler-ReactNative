import State from "./state";
import { createSelector } from "reselect";

export const getAccentColor = (state: State) => state.theme.accentColor;

export const getBackgroundColor = (state: State) => state.theme.backgroundColor;

export const getBusinessData = (state: State) => state.businesses;

export const getCollectionItems = (state: State) => state.collection.items;

export const getRecomFeed = (state: State) => state.recommendation.feeds;

export const getCurrentRecomIndex = (state: State) => state.recommendation.currentIndex;

export const getCurrentRecomData = createSelector(
	getBusinessData,
	getRecomFeed,
	getCurrentRecomIndex,
	(businessData, recomFeed, index) => businessData[recomFeed[index]]
);
