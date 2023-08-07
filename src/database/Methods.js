// Following methods are for localStorage
// User's CRUD
// Create
export function Data_AddUser(UserData) {
    const Data = JSON.parse(localStorage.getItem("2Do")) // get old data
    UserData.id = `User_${Date.now()}` // add Id attribute (= "User" + local time stamp )

    if (Data.push(UserData)) { // if push success -> return new length
        try {
            localStorage.setItem("2Do", JSON.stringify(Data)) // update new data after add new user
            return {
                message: "User_AddUser:Add_Success", // return success message
                data: Data // return new data
            }
        }
        catch (error) { // catch error failed update
            return {
                message: `User_AddUser:Update_Failed:${error}`, // return failed message
                data: undefined
            }
        }
    }
    else { // case cannot push
        return {
            message: "User_AddUser:Add_Failed:Cannot_add_the_new_user", // return failed message
            data: undefined
        }
    }
}

// Read
export function Data_GetUsers() {
    const Data = JSON.parse(localStorage.getItem("2Do"))
    if (Data) { // if get users data success
        return {
            message: "User_GetUser:Get_Success", // return success message
            data: Data // return data 
        }
    }
    else {
        return { // case cannot get
            message: "User_GetUser:Get_Failed:Cannot_get_the_users's_data", // return failed message
            data: undefined
        }
    }
}

export function Data_GetUserId(account, password) {
    const Data = JSON.parse(localStorage.getItem("2Do"))
    if (Data) { // if get users data success
        const TargetUser = Data.find(
            (user) => user.account === account && user.password === password
        )
        if(TargetUser) { // case found user
            return {
                message: "User_GetUserId:Get_Success", // return failed message
                data: {
                    UserId: TargetUser.id,
                    UserList: TargetUser.list
                }
            }
        }
        else {
            return { // case not found
                message: "User_GetUserId:Get_Failed:Cannot_find_the_user_with_given_id", // return failed message
                data: undefined
            }
        }
    }
    else {
        return { // case cannot get
            message: "User_GetUser:Get_Failed:Cannot_get_the_users's_data", // return failed message
            data: undefined
        }
    }
}

// Update & Delete -> None

/* ------------------------------------------------------------------------- */
// Todo's CRUD
// Create
export function Data_AddTodo(userId, ToDoData) {
    const Data = JSON.parse(localStorage.getItem("2Do")) // get old data
    const DataUsersLength = Data.length // get the data's length

    for (let i = 0; i < DataUsersLength; i++) { // loop through the users data
        if (Data[i].id === userId) { // find the user with Id
            const TargetUser = Data[i]
            ToDoData.id = `Todo_${Date.now()}` // add Id attribute (= Todo + local time stamp )

            if (Data[i].list.push(ToDoData)) { // add success -> return new length
                try {
                    localStorage.setItem("2Do", JSON.stringify(Data)) // update new data after add new todo
                    return {
                        message: "Todo_AddTodo:Add_Success", // return success message
                        data: TargetUser.list // return new data
                    }
                }
                catch (error) { // catch error update failed
                    return {
                        message: `Todo_AddTodo:Update_Failed:${error}`, // return failed message
                        data: undefined
                    }
                }
            }
            else {
                return { // case cannot push
                    message: "Todo_AddTodo:Add_Failed:Cannot_push_new_Todo", // return failed message
                    data: undefined
                }
            }
        }
    }
    return { // case cannot find
        message: "Todo_AddTodo:Add_Failed:Cannot_find_user_with_given_Id", // return failed message
        data: undefined
    }
}

// Read
export function Data_GetTodo(userId) {
    const Data = JSON.parse(localStorage.getItem("2Do")) // get old data
    const TargetUser = Data.find((user) => user.id === userId) // find the user with given Id

    if (TargetUser) {
        return {
            message: "Todo_GetTodo:Get_Success", // return success message
            data: TargetUser.list
        }
    }
    else { // case cannot find
        return {
            message: "Todo_GetTodo:Get_Failed:Cannot_find_the_user_with_given_Id", // return failed message
            data: undefined
        }
    }
}

// Update
export function Data_ChangeTodo(userId, todoId, attribute, new_attribute_value) {
    const Data = JSON.parse(localStorage.getItem("2Do")) // get old data
    const DataUsersLength = Data.length // get the data's length

    for (let i = 0; i < DataUsersLength; i++) {
        if (Data[i].id === userId) { // find the user with Id
            const TargetUser = Data[i] // get target user whose todo update
            const DataTodoLength = TargetUser.list.length // get the todo's length

            for (let j = 0; j < DataTodoLength; j++) {
                if (TargetUser.list[j].id === todoId) { // find the todo Id
                    const TargetTodo = TargetUser.list[j] // get target todo update
                    TargetTodo[attribute] = new_attribute_value // change todo attribute
                    try {
                        localStorage.setItem("2Do", JSON.stringify(Data)) // update new data after change todo attribute
                        return {
                            message: "Todo_ChangeTodo:Change_Success", // return success message
                            data: TargetUser.list // return new data
                        }
                    }
                    catch (error) { // catch error update failed
                        return {
                            message: `Todo_ChangeTodo:Update_Failed:${error}`, // return failed message
                            data: undefined
                        }
                    }
                }
            }
            return { // case cannot find todo
                message: "Todo_ChangeTodo:Change_Failed:Cannot_find_todo_with_given_Id", // return failed message
                data: undefined
            }
        }
    }
    return { // case cannot find user
        message: "Todo_ChangeTodo:Change_Failed:Cannot_find_user_with_given_Id", // return failed message
        data: undefined
    }
}

// Delete
export function Data_DeleteTodo(userId, todoId) {
    const Data = JSON.parse(localStorage.getItem("2Do")) // get old data
    const DataUsersLength = Data.length // get the data's length

    for (let i = 0; i < DataUsersLength; i++) {
        if (Data[i].id === userId) { // find the user with Id
            const TargetUser = Data[i] // get target user whose todo update
            const DataTodoLength = TargetUser.list.length // get the todo's length

            for (let j = 0; j < DataTodoLength; j++) {
                if (TargetUser.list[j].id === todoId) { // find the todo Id
                    const result = TargetUser.list.splice(j, 1)
                    if (result) { // delete success
                        try {
                            localStorage.setItem("2Do", JSON.stringify(Data)) // update new data after delete todo
                            return {
                                message: "Todo_DeleteTodo:Delete_Success", // return success message
                                data: TargetUser.list // return new data
                            }
                        }
                        catch (error) { // catch error update failed
                            return {
                                message: `Todo_DeleteTodo:Update_Failed:${error}`, // return failed message
                                data: undefined
                            }
                        }
                    }
                    else {
                        return { // case cannot delete todo
                            message: "Todo_DeleteTodo:Delete_Failed:Cannot_delete_todo", // return failed message
                            data: undefined
                        }
                    }
                }
            }
            return { // case cannot find todo
                message: "Todo_DeleteTodo:Delete_Failed:Cannot_find_todo_with_given_Id", // return failed message
                data: undefined
            }
        }
    }
    return { // case cannot find user
        message: "Todo_DeleteTodo:Delete_Failed:Cannot_find_user_with_given_Id", // return failed message
        data: undefined
    }
}