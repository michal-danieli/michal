import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

class Settings extends React.Component {
    state = {
        organ:  ["Hever", "Histadrut a morim", "Eirgon a morim"]
    }

    onBoxClick = (e) =>{
        const cookies = new Cookies();
        let data = new FormData();
        data.append("token", cookies.get("logged_in"))
        data.append("organizationName", e.target.value)
        axios.post("http://localhost:8989/edit-user-to-organization",data )
            .then((response) =>{
                })
    }


    render() {
        return (
            <div>
                this is the settings page
                <fieldset>
                    <legend>Select the organizations of which you are friends</legend>
                    {
                        this.state.organ.map((org) => {
                            return (
                                <div>
                                    <input type="checkbox" id={org} name="interest" value={org} onClick={this.onBoxClick} />
                                    <label htmlFor="coding" >{org}</label>
                                </div>
                            )
                        })
                    }
                </fieldset>
            </div>
        )
    }
}




export default Settings;
