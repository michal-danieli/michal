import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        showError: "",
        success: false
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    SignUp = () => {
        let data = new FormData();
        data.append("username", this.state.username)
        data.append("password", this.state.password)
        axios.post("http://localhost:8989/create-account", data)
            .then((response) => {
                if (response.data && response.data!= "usernameExist") {
                    this.setState({
                        showError: "the user create, now go to login in our site!",
                        success: true
                    })
                    const cookies = new Cookies();
                    cookies.set("logged_in", response.data);
                    window.location.replace("http://localhost:3001/Settings")
                } else {
                    this.setState({
                        showError: "the username exist - change your username!"
                    })
                }
            })
    }



    render() {
        return (
            <div >
                <div className={"title"}>
                    Enter password and userName to sign-up
                </div>
                <div >
                    <input className={"button"}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <input className={"button"}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    {/*<NavLink to={"/Settings"} className={"link"} activeClassName={"active"}>*/}
                        <button className={"button"} onClick={this.SignUp}>sign-up</button>
                    {/*</NavLink>*/}
                </div>
                <div className={"showError"}>
                    {this.state.showError}
                </div>
                <div>
                    <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                        <button className={"button"}>back to logIn</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default SignUp;

