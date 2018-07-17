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

export function createTask(newTask) {
    return async (dispatch) => {
        //TODO: create a task when creating a user. Every new task would be an update of a row
        let taskToSave = {
            body: {
                "tasks": newTask,
                "createDate": '2018-06-14T06-38-39.742Z'
            }
        };

        const path = "/Tasks";

        try {
            const apiResponse = await API.post("TasksCRUD", path, taskToSave);
            if (apiResponse.error) {
                dispatch(failureCreatingNewTask());
            } else {
                dispatch(confirmCreateNewTask());
            }
            console.log("response from saving a task in actions: ");
            console.log(apiResponse);
        } catch (e) {
            dispatch(failureCreatingNewTask());
            console.log(e);
        }
    }
}

export function updateTask(Description, Name, createDate) {
    return async (dispatch) => {
        let newTask = {
            body: {
                "Description": Description,
                "Name": Name,
                "createDate": createDate
            }
        };

        const path = "/Tasks";

        try {
            const apiResponse = await API.put("TasksCRUD", path, newTask);
            if (apiResponse.error) {
                dispatch(failureUpdatingTask());
            } else {
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
        const path = "/Tasks";

        try {
            const apiResponse = await API.get("TasksCRUD", path);
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

export function deleteTask(createDate) {
    return async (dispatch) => {

        const path = "/Tasks/object/" + createDate;
        try {
            const apiResponse = await API.del("TasksCRUD", path);
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
