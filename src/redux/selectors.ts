import State from "./state";
import { createSelector } from "reselect";
import Color from "color";
import getCompareFunc from "./businessSortCompare";
import { sort } from "../util/array";
import { getCurrentDate } from "../util/time";
import { isBusinessOpen } from "./state/Business";

export const getAccentColor = (state: State) => state.theme.accentColor;

export const getBackgroundColor = (state: State) => state.theme.backgroundColor;

export const getBusinessData = (state: State) => state.businesses;

export const getCollectionItems = (state: State) => state.collection.items;

export const getRecomFeed = (state: State) => state.recommendation.feeds;

export const getCurrentRecomIndex = (state: State) => state.recommendation.currentIndex;

export const getCollectionItemsPinned = (state: State) => state.collection.pinnedItems;

export const getCollectionShowPin = (state: State) => state.collection.showPin;

export const getCollectionSortMethod = (state: State) => state.collection.sortMethod;

export const getCollectionSearchInput = (state: State) => state.collection.searchInput;

export const getCollectionFilter = (state: State) => state.collection.filter;

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

export const getAreBusinessesOpen = createSelector(
	getBusinessData,
	businesses => {
		let openData: { [index: string]: boolean } = {};
		const [currentTime, currentDay] = getCurrentDate();
		Object.entries(businesses).forEach(
			([id, data]) => (openData[id] = isBusinessOpen(data, currentTime, currentDay))
		);
		return openData;
	}
);

export const getAllCollectionItems = createSelector(
	getCollectionItems,
	getCollectionItemsPinned,
	getBusinessData,
	getCollectionSortMethod,
	getCollectionShowPin,
	getCollectionSearchInput,
	getCollectionFilter,
	getAreBusinessesOpen,
	(
		items,
		pinnedItems,
		businesses,
		sortMethod,
		showPin,
		search,
		filter,
		openData
	): [string[], number] => {
		let pinnedItemsCopy = showPin ? [...pinnedItems] : [];
		let itemsCopy = showPin ? [...items] : [...pinnedItems, ...items];
		const isOrdered = getCompareFunc(sortMethod, businesses);
		sort(pinnedItemsCopy, isOrdered);
		sort(itemsCopy, isOrdered);
		let allItems = [...pinnedItemsCopy, ...itemsCopy].filter(val => {
			const data = businesses[val];
			const isOpen = openData[val];
			return (
				data.name.toLowerCase().includes(search.toLowerCase()) &&
				(filter.status == "all" || filter.status == "open" ? isOpen : !isOpen) &&
				(filter.rating == "all" || filter.rating.include(data.rating)) &&
				(filter.ratingNum == "all" || filter.ratingNum.include(data.ratingNum))
			);
		});
		return [allItems, pinnedItemsCopy.length];
	}
);
