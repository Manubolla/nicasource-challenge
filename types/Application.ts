import {
	SAVE_QR_DATA,
	DELETE_QR_DATA,
	CLEAN_QR_LIST,
	ADD_SELECTED_ITEM,
	REMOVE_SELECTED_ITEM,
	CLEAN_DELETE_LIST,
} from '../constants/Application';

export type ApplicationENUM =
	| typeof SAVE_QR_DATA
	| typeof ADD_SELECTED_ITEM
	| typeof DELETE_QR_DATA
	| typeof CLEAN_QR_LIST
	| typeof REMOVE_SELECTED_ITEM
	| typeof CLEAN_DELETE_LIST


export type QRType = {
	id: string;
	value: string;
};

export type Application = {
	QRList: [] | QRType[];
	toDeleteList: [] | QRType[];
};
