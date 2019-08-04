/**
 * Provides selectors.
 */
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

export const getIsFontLoaded = (state: State) => state.app.fontLoaded;

export const getOpenedBusinessId = (state: State) => state.app.openedBusinessId;

export const getGalleryIndex = (state: State) => state.app.galleryIndex;

export const getCurrentOpenedData = createSelector(
	getBusinessData,
	getRecomFeed,
	getCurrentRecomIndex,
	getOpenedBusinessId,
	(businessData, recomFeed, index, openedBusinessId) =>
		openedBusinessId ? businessData[openedBusinessId] : businessData[recomFeed[index]]
);

// Return black or white depend on the backgroundColor state.
//* Idk how it works btw :3
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
		// Fill up openData with map between business id and a boolean.
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
		// If showPin is false, then no pinned item is rendered, so it is an empty array.
		// All of the pinned item is then included in normal items.
		let pinnedItemsCopy = showPin ? [...pinnedItems] : [];
		let itemsCopy = showPin ? [...items] : [...pinnedItems, ...items];

		const isOrdered = getCompareFunc(sortMethod, businesses);

		sort(pinnedItemsCopy, isOrdered);
		sort(itemsCopy, isOrdered);

		let allItems = [...pinnedItemsCopy, ...itemsCopy].filter(val => {
			const data = businesses[val];
			const isOpen = openData[val];
			return (
				// Filtering using search input,
				data.name.toLowerCase().includes(search.toLowerCase()) &&
				// Filtering business status.
				(filter.status == "all" || (filter.status == "open" ? isOpen : !isOpen)) &&
				// Filtering rating.
				(filter.rating == "all" || filter.rating.include(data.rating)) &&
				// Filtering ratingNum.
				(filter.ratingNum == "all" || filter.ratingNum.include(data.ratingNum))
			);
		});
		return [allItems, pinnedItemsCopy.length];
	}
);
