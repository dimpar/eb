export const CONFIRM_CREATE_NEW_TASK = 'CONFIRM_CREATE_NEW_TASK'
export const FAILURE_CREATE_NEW_TASK = 'FAILURE_CREATE_NEW_TASK'
export const CONFIRM_GET_TASKS = 'CONFIRM_GET_TASKS'
export const FAILURE_GET_TASKS = 'FAILURE_GET_TASKS'

const initialState = {
    confirmCreatedTask: false,
    failureCreatingTask: false,
    confirmGetTasks: false,
    failureGetTasks: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CONFIRM_CREATE_NEW_TASK:
            console.log("I am in task reducer CONFIRM_CREATE_NEW_TASK");
            return {
                ...state,
                confirmCreatedTask: true,
            };
        case FAILURE_CREATE_NEW_TASK:
            console.log("I am in task reducer FAILURE_CREATE_NEW_TASK");
            return {
                ...state,
                failureCreatingTask: true
            };
        case CONFIRM_GET_TASKS:
            console.log("I am in task reducer CONFIRM_GET_TASKS");
            return {
                ...state,
                confirmGetTasks: true,
            };
        case FAILURE_GET_TASKS:
            console.log("I am in task reducer FAILURE_GET_TASKS");
            return {
                ...state,
                failureGetTasks: true
            };
        default:
            return state
    }
}
