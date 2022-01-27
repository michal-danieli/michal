import './App.css';
import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class NavigationBar extends React.Component {
    state = {
        links: [{title: "Home Page", path: "/home-page"}, {title: "Shop list", path: "/stores-list"}, {title: "Search", path: "/search"}, {title: "Settings", path: "/settings"}]
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div className={"navigationBar"}>
                <ul>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path}  activeClassName={"active"}>
                                    <li className={"navigationLink"}>
                                        {link.title}
                                    </li>
                                </NavLink>
                            )
                        })
                    }
                    <p style= {{ color: "red", margin: "50px" }}></p>
                    <li onClick={this.logout}>
                        <NavLink to={"/"} className={"logoutLink"} activeClassName={"active"}>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
export default NavigationBar;
