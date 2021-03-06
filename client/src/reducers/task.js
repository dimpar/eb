export const CONFIRM_CREATE_NEW_TASK = 'CONFIRM_CREATE_NEW_TASK';
export const FAILURE_CREATE_NEW_TASK = 'FAILURE_CREATE_NEW_TASK';
export const CONFIRM_GET_TASKS = 'CONFIRM_GET_TASKS';
export const FAILURE_GET_TASKS = 'FAILURE_GET_TASKS';
export const RESET_CREATE_NEW_TASK = 'RESET_CREATE_NEW_TASK';
export const CONFIRM_DELETE_TASK = 'CONFIRM_DELETE_TASK';
export const FAILURE_DELETE_TASK = 'FAILURE_DELETE_TASK';
export const RESET_DELETE_TASK = 'RESET_DELETE_TASK';
export const RESET_UPDATING_TASK = 'RESET_UPDATING_TASK';
export const FAILURE_UPDATING_TASKS = 'FAILURE_UPDATING_TASKS';
export const CONFIRM_UPDATING_TASKS = 'CONFIRM_UPDATING_TASKS';

const initialState = {
    confirmCreatedTask: false,
    failureCreatingTask: false,
    confirmGetTasks: false,
    failureGetTasks: false,
    confirmDeletedTask: false,
    failureDeletingTask: false,
    failureUpdatingTask: false,
    confirmUpdatingTask: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CONFIRM_CREATE_NEW_TASK:
            return {
                ...state,
                confirmCreatedTask: true,
            };
        case FAILURE_CREATE_NEW_TASK:
            return {
                ...state,
                failureCreatingTask: true
            };
        case CONFIRM_GET_TASKS:
            return {
                ...state,
                confirmGetTasks: true,
            };
        case FAILURE_GET_TASKS:
            return {
                ...state,
                failureGetTasks: true
            };
        case RESET_CREATE_NEW_TASK:
            return {
                ...state,
                confirmCreatedTask: false,
            };
        case CONFIRM_DELETE_TASK:
            return {
                ...state,
                confirmDeletedTask: true,
            };
        case FAILURE_DELETE_TASK:
            return {
                ...state,
                failureDeletingTask: true
            };
        case RESET_DELETE_TASK:
            return {
                ...state,
                confirmDeletedTask: false
            };
        case FAILURE_UPDATING_TASKS:
            return {
                ...state,
                failureUpdatingTask: true
            };
        case CONFIRM_UPDATING_TASKS:
            return {
                ...state,
                confirmUpdatingTask: true
            };
        case RESET_UPDATING_TASK:
            return {
                ...state,
                confirmUpdatingTask: false
            };
        default:
            return state
    }
}
