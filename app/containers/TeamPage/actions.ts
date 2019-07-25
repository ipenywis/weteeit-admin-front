import { action } from 'typesafe-actions';
import { ActionTypes } from './constants';

export const openEditPopover = (teamId: string) =>
  action(ActionTypes.OPEN_EDIT_POPOVER, teamId);

export const closeEditPopover = () => action(ActionTypes.CLOSE_EDIT_POPOVER);

export const openDeleteAlert = (teamId: string) =>
  action(ActionTypes.OPEN_DELETE_ALERT, teamId);

export const closeDeleteAlert = () => action(ActionTypes.CLOSE_DELETE_ALERT);
