import React from "react";

const UserItem = ({user})=>{
    return(<tr>
        <td>
            {user.nickname}
        </td>
        <td>
            {user.first_name}
        </td>
        <td>
            {user.last_name}
        </td>

        <td>
            {user.email}
        </td>
    </tr>)
}

const UserList = ({users}) => {
    return(
        <table>
            <th>
                Nick name
            </th>
            <th>
                First name
            </th>

            <th>
                Last_name
            </th>

            <th>
                Email
            </th>
            {users.map((user) => <UserItem user={user}/> )}
        </table>
    )
}
export default UserList