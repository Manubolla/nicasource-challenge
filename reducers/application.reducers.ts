import {
	ADD_SELECTED_ITEM,
	CLEAN_QR_LIST,
	DELETE_QR_DATA,
	REMOVE_SELECTED_ITEM,
	SAVE_QR_DATA,
} from '../constants/Application';
import { Application, ApplicationENUM, QRType } from '../types/Application';

const initialState: Application = {
	QRList: [],
	toDeleteList: [],
};

const applicationReducer = (
	state: Application = initialState,
	action: { type: ApplicationENUM; value: QRType | QRType[] }
) => {
	switch (action.type) {
		case CLEAN_QR_LIST:
			return { ...state, QRList: [], toDeleteList: [] };
		case SAVE_QR_DATA:
			return { ...state, QRList: [...state.QRList, { ...action.value }] };
		case DELETE_QR_DATA: {
			if (!state.QRList || !state.toDeleteList) return { ...state, QRList: [] };
			if (state.toDeleteList.length == 0 || state.QRList.length == 0)
				return { ...state, QRList: state.QRList };

			const newList = state.QRList.filter((QRListItem) => {
				const result = state.toDeleteList.filter(
					(deleteListitem) => QRListItem.value == deleteListitem.value
				);
				return result.length == 0;
			});
			return { ...state, QRList: newList, toDeleteList: [] };
		}
		case ADD_SELECTED_ITEM: {
			let isInList = false;
			(state.toDeleteList as QRType[]).forEach((item) => {
				if (item.value == (action.value as QRType).value) isInList = true;
			});
			if (isInList) return;
			else return { ...state, toDeleteList: [...state.toDeleteList, action.value] };
		}
		case REMOVE_SELECTED_ITEM: {
			if (state.QRList.length == 0) return;
			const filteredList = state.toDeleteList.filter(
				(item) => item.value !== (action.value as QRType).value
			);
			return { ...state, toDeleteList: filteredList };
		}

		default:
			return state;
	}
};

export default applicationReducer;
