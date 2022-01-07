import './App.css';
import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class NavigationBar extends React.Component {
    state = {
        links: [{title: "Home Page", path: "/home-page"}, {title: "stores list", path: "/stores-list"}, {title: "search", path: "/search"}, {title: "settings", path: "/settings"}]
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className={"title"}>
                    Navigation Bar
                </div>
                <ul>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path} className={"link"} activeClassName={"active"}>
                                    <li>
                                        {link.title}
                                    </li>
                                </NavLink>
                            )
                        })
                    }

                    <li onClick={this.logout}>
                        <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
export default NavigationBar;
