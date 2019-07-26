import { createStandardAction } from "typesafe-actions";
import { SortMethod } from "../businessSortCompare";

export const setAccentColor = createStandardAction("theme/SET_ACCENT_COLOR")<string>();

export const toNextRecom = createStandardAction("recommendation/NEXT_RECOMMENDATION")();

export const setCollectSortMethod = createStandardAction("collection/SET_SORT_METHOD")<SortMethod>();

export const saveBusiness = createStandardAction("collection/SAVE_BUSINESS")<string>();

export const pinCollectItem = createStandardAction("collection/PIN_ITEM")<string>();

export const unPinCollectItem = createStandardAction("collection/UN_PIN_ITEM")<string>();

export const removedCollectItem = createStandardAction("collection/REMOVED_ITEM")<string>();
