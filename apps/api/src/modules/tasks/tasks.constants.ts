export const TASK_SUCCESS_MSG = {
  CREATED: 'Task created successfully.',
  UPDATED: 'Task updated successfully.',
  DELETED: 'Task deleted successfully.',
} as const;

export const TASK_ERROR_MSG = {
  NOT_FOUND: 'Task could not be found.',
  EDIT_ONLY_PENDING: 'Only pending tasks can be edited.',
  ROOM_NOT_FOUND: 'Room could not be found.',
  HOUSEKEEPER_NOT_FOUND: 'Active housekeeper could not be found.',
  HOUSEKEEPER_TASK_FORBIDDEN: 'You can only update tasks assigned to you.',
  STATUS_TRANSITION_INVALID:
    'Task status must advance from pending to in progress, then completed.',
} as const;
