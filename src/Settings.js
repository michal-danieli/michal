import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

class Settings extends React.Component {
    state = {
        organ:  [],
        organOfUser: []
    }

    componentDidMount() {
        this.getAllOrganization()
        this.getOrganizationOfUser()
    }

    onBoxClick = (e) =>{
        const cookies = new Cookies();
        let data = new FormData();
        data.append("token", cookies.get("logged_in"))
        data.append("organizationId", parseInt(e.target.value))
        axios.post("http://localhost:8989/edit-user-to-organization",data )
            .then((response) =>{
                this.getOrganizationOfUser()
            })
    }

    getOrganizationOfUser=()=>{
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-all-organizations-of-user", {
            params:{
                token: cookies.get("logged_in")
            }
        })
            .then((response) =>{
                let organizationOfUser = response.data
                this.setState({
                    organOfUser:organizationOfUser
                })
            })
    }

    getAllOrganization=()=>{
        axios.get("http://localhost:8989/get-all-organizations")
            .then((response) =>{
                let organization = response.data
                this.setState({
                    organ:organization
                })
            })
    }

    checkIfUserConnectToOrganization=(organization)=>{
        let connect = false
        this.state.organOfUser.map((org)=>{
            return(
                <div>
                    {
                        org.id == organization  &&
                            <div>
                                {
                                    connect = true
                                }
                            </div>
                    }
                </div>
            )
        })
        return connect
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
                                    <input type="checkbox" id={org} name="interest" checked={this.checkIfUserConnectToOrganization(org.id)} value={org.id} onClick={this.onBoxClick} />
                                    <label htmlFor="coding" >{org.organizationName}</label>
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
