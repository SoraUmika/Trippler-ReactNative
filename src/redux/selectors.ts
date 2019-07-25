import State from "./state";
import { createSelector } from "reselect";
import Color from "color";

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

export const getForegroundColor = createSelector(
	getBackgroundColor,
	bg => {
		const nThreshold = 105;
		const channels = Color(bg)
			.rgb()
			.array();
		const bgDelta = channels[0] * 0.299 + channels[1] * 0.587 + channels[2] * 0.114;
		return 255 - bgDelta < nThreshold ? "#000000" : "#ffffff";
	}
);
