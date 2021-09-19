import {
	ADD_SELECTED_ITEM,
	CLEAN_DELETE_LIST,
	CLEAN_QR_LIST,
	DELETE_QR_DATA,
	REMOVE_SELECTED_ITEM,
	SAVE_QR_DATA,
} from '../constants/Application';
import { QRType } from '../types/Application';

export const saveQRData = (value: QRType) => {
	return { type: SAVE_QR_DATA, value };
};
export const deleteQRData = () => {
	return { type: DELETE_QR_DATA };
};
export const cleanQRList = () => {
	return { type: CLEAN_QR_LIST };
};
export const addSelectedItem = (value: QRType) => {
	return { type: ADD_SELECTED_ITEM, value };
};
export const removeSelectedItem = (value: QRType) => {
	return { type: REMOVE_SELECTED_ITEM, value };
};
export const cleanDeleteList = () => {
	return {type: CLEAN_DELETE_LIST}
}
