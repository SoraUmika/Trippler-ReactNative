/**
 * Individual actions are defined here.
 */
import { createStandardAction } from "typesafe-actions";
import { SortMethod } from "../businessSortCompare";

export const setAccentColor = createStandardAction("theme/SET_ACCENT_COLOR")<string>();

export const toNextRecom = createStandardAction("recommendation/NEXT_RECOMMENDATION")();

export const setCollectSortMethod = createStandardAction("collection/SET_SORT_METHOD")<
	SortMethod
>();

export const saveBusiness = createStandardAction("collection/SAVE_BUSINESS")<string>();

export const pinCollectItem = createStandardAction("collection/PIN_ITEM")<string>();

export const unPinCollectItem = createStandardAction("collection/UN_PIN_ITEM")<string>();

export const removedCollectItem = createStandardAction("collection/REMOVED_ITEM")<string>();

export const toggleCollectShowPin = createStandardAction("collection/TOGGLE_SHOW_PIN")();

export const setCollectSearchInput = createStandardAction("collection/SET_SEARCH_INPUT")<string>();

export const fontLoaded = createStandardAction("app/FONT_LOADED")();

export const nextGalleryIndex = createStandardAction("app/NEXT_GALLERY_INDEX")<
	"forward" | "backward"
>();

export const openBusiness = createStandardAction("app/OPEN_BUSINESS")<null | string>();

export const requestRandBuss = createStandardAction('requests/RAND_BUSSINESS')()
export const receiveRandBuss = createStandardAction('receive/RAND_BUSSINESS')<{}>()
export const errorRandBuss = createStandardAction('error/RAND_BUSSINESS')<{}>()

export const grabRandBussiness = () => {
	return(dispatch: any, getState: any) => {
		dispatch({type: 'requests/RAND_BUSSINESS'})
		fetch('http://35.168.17.106:3000/database', {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json',
			},
			body: JSON.stringify({type: 'grab_random_bussiness', message: 'wow'})
		})
		.then(res => res.json())
		.then(data => {
			if(data.ErrorFromServer){
				console.log(data)
				dispatch({type: 'receive/RAND_BUSSINESS', payload: data})
			}
		})
		.catch(err => {
			dispatch({type: 'error/RAND_BUSSINESS', payload: err})
		})
	}
}

export const insertNewUser = () => {

}

export const loginAuthentication = () => {

} 