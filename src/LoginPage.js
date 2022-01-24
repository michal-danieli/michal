import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";
class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        response:""
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

    login = () => {
        axios.get("http://127.0.0.1:8989/get-token",{
            params:{
                username:this.state.username,
                password:this.state.password
            }
        })
            .then((response)=>{
                if (response.data == "usernameDoesntExist") {
                    this.setState({
                        showError:"The user does not exist "
                    })
                }else {
                    if (response.data == "passwordIncorrect") {
                        this.setState({
                            showError:"The password is incorrect"
                        })
                    } else {
                        const cookies = new Cookies();
                        cookies.set("logged_in", response.data);
                        window.location.reload();
                    }
                }
            })
    }



    render() {
        return (
            <div className={"loginAndSignIn"}>
                <div className={"title"}>
                    Enter your login credentials
                </div>
                <div >
                    <div>
                            <input className={"input"}
                                   onChange={this.onUsernameChange}
                                   value={this.state.username}
                                   placeholder={"Enter username"}
                            />
                    </div>
                    <div>
                            <input className={"input"}
                                   onChange={this.onPasswordChange}
                                   value={this.state.password}
                                   placeholder={"Enter password"}
                            />
                    </div>
                    <text>
                        <button className={"button"} onClick={this.login}>Login</button>
                    </text>
                </div>
                <div className={"showError"}>
                    {
                        this.state.showError
                    }
                </div>
                <div>
                    <NavLink to={"/signUp"} className={"link"} activeClassName={"active"}>
                        <button className={"button"} >Go to signUp</button>
                    </NavLink>
                </div>
            </div>
        )
    }
}
export default LoginPage;
