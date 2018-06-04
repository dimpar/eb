import { API } from 'aws-amplify'

import {
    CONFIRM_CREATE_NEW_TASK,
    FAILURE_CREATE_NEW_TASK,
    CONFIRM_GET_TASKS,
    FAILURE_GET_TASKS,
    RESET_CREATE_NEW_TASK
} from '../reducers/task'

export function createTask(Description, Name, createDate) {
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
            const apiResponse = await API.post("TasksCRUD", path, newTask);
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
            console.log("response from getting tasks: ");
            console.log(apiResponse);
            return apiResponse;
        } catch (e) {
            dispatch(failureGetTasks());
            console.log(e);
        }
    }
}

//TODO: add delete tasks functionality

//TODO: add update tasks functionality

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
