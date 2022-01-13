import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import {BrowserRouter, NavLink} from "react-router-dom";
import NavigationBar from "./NavigationBar";
import HomePage from "./HomePage";
import Search from "./Search";
import Settings from "./Settings";
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";
import {Route} from "react-router";
import Shop from "./Shop";


class storesList extends React.Component {
    state = {
        shopList:[]
    }

    componentDidMount() {
        this.getAllStores()
    }

    getAllStores =()=>{
        axios.get("http://localhost:8989/get-all-shops")
            .then((response)=>{
                let shopList = response.data
                this.setState({
                    shopList: shopList
                })
            })
    }


    render() {
        return (
            <div>
                <div className={"componentTitle"}>
                    Shop List
                </div>

                {
                    this.state.shopList.map(shop =>{
                        return(
                            <NavLink to={"stores-List/" + shop.id} className={"link"} activeClassName={"active"}>
                                <div className={"shopLink"}>
                                    {shop.name}
                                </div>
                            </NavLink>
                        )
                    })
                }
                {/*<BrowserRouter>*/}
                {/*    {*/}
                {/*        this.state.shopList.map(shop =>{*/}
                {/*            return(*/}
                {/*                <Route path={"stores-List/" + shop.name} component={Shop} exact={true}/>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</BrowserRouter>*/}

            </div>
        )
    }
}




export default storesList;
