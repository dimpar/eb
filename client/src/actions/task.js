import { API } from 'aws-amplify'

import {
    CONFIRM_CREATE_NEW_TASK,
    FAILURE_CREATE_NEW_TASK,
    CONFIRM_GET_TASKS,
    FAILURE_GET_TASKS,
    RESET_CREATE_NEW_TASK,
    CONFIRM_DELETE_TASK,
    FAILURE_DELETE_TASK,
    RESET_DELETE_TASK,
    CONFIRM_UPDATING_TASKS,
    FAILURE_UPDATING_TASKS,
    RESET_UPDATING_TASK
} from '../reducers/task'


const homePath = '/tasksnotes';
const APIname = 'tasksnotesCRUD';

export function addTask(newTask) {
    return async (dispatch) => {
        let taskToSave = {
            body: {
                "task": newTask
            }
        };

        console.log("adding task to save: ", taskToSave);

        let path = homePath + "/task/update";

        try {
            const apiResponse = await API.put(APIname, path, taskToSave);
            if (apiResponse.error) {
                console.log("Error - /tasks/add", apiResponse);
                dispatch(failureCreatingNewTask());
            } else {
                console.log("Life's good - /tasks/add", apiResponse);
                dispatch(confirmCreateNewTask());
            }
        } catch (e) {
            dispatch(failureCreatingNewTask());
            console.log("Error exception", e);
        }
    }
}

export function updateTask(taskToUpdate) {
    return async (dispatch) => {
        let updatedTask = {
            body: {
                "task": taskToUpdate
            }
        };

        let path = homePath + "/task/update";

        try {
            const apiResponse = await API.put(APIname, path, updatedTask);
            if (apiResponse.error) {
                console.log("error", apiResponse);
                dispatch(failureUpdatingTask());
            } else {
                console.log("good", apiResponse);
                dispatch(confirmUpdatingTask());
            }
        } catch (e) {
            dispatch(failureUpdatingTask());
            console.log(e);
        }
    }
}

export function resetCreateTask() {
    return (dispatch) => {
        dispatch(resetCreateNewTask());
    }
}

export function getTasks() {
    return async (dispatch) => {
        try {
            let path = homePath + '/tasks';
            const apiResponse = await API.get(APIname, path);

            if (apiResponse.error) {
                dispatch(failureGetTasks())
            } else {
                dispatch(confirmGetTasks())
            }

            return apiResponse;
        } catch (e) {
            dispatch(failureGetTasks());
            console.log(e);
        }
    }
}

export function deleteTask(id) {
    return async (dispatch) => {

        const path = homePath + "/task/delete/";

        let taskToDelete = {
            body: {
                "taskToDeleteId": id,
            }
        };

        try {
            const apiResponse = await API.put(APIname, path, taskToDelete);
            if (apiResponse.error) {
                dispatch(failureDeleteTask())
            } else {
                dispatch(confirmDeleteTask())
            }
        } catch (e) {
            dispatch(failureDeleteTask());
        }
    }
}

export function resetDeleteTask() {
    //TODO: do you need dispatch and async here?
    return async (dispatch) => {
        dispatch(resetDeleteTask());
    }
}

export function resetUpdateTask() {
    return {
        type: RESET_UPDATING_TASK
    }
}

function confirmUpdatingTask() {
    return {
        type: CONFIRM_UPDATING_TASKS
    }
}

function failureUpdatingTask() {
    return {
        type: FAILURE_UPDATING_TASKS
    }
}

function confirmGetTasks() {
    return {
        type: CONFIRM_GET_TASKS
    }
}

function failureGetTasks() {
    return {
        type: FAILURE_GET_TASKS
    }
}

function confirmCreateNewTask() {
    return {
        type: CONFIRM_CREATE_NEW_TASK
    }
}

function resetCreateNewTask() {
    return {
        type: RESET_CREATE_NEW_TASK
    }
}

function failureCreatingNewTask() {
    return {
        type: FAILURE_CREATE_NEW_TASK
    }
}

function confirmDeleteTask() {
    return {
        type: CONFIRM_DELETE_TASK
    }
}

function failureDeleteTask() {
    return {
        type: FAILURE_DELETE_TASK
    }
}

function resetDeleteTask() {
    return {
        type: RESET_DELETE_TASK
    }
}
