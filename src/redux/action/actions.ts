import { createStandardAction } from "typesafe-actions";
import { SortMethod } from "../businessSortCompare";

export const setAccentColor = createStandardAction("theme/accentColor/SET")<string>();

export const toNextRecom = createStandardAction("recommendation/currentIndex/INNC")();

export const setCollectSortMethod = createStandardAction("collection/sortMethod/SET")<SortMethod>();

export const saveBusiness = createStandardAction("collection/items/ADD")<string>();
