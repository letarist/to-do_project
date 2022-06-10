import { render } from "@testing-library/react";
import React from "react";

// const logout =({exit})=> {
//     this.props.exit()


class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h1>Ты уверен? Если да, то нажмите кнопку для выхода</h1>
            <button onClick={()=>this.props.logout()}>Выйти</button>
            <p>единственное в чем я уверен, это то, что я ненавижу реакт</p>
            </div>

        )
    }
    }


export default Logout;