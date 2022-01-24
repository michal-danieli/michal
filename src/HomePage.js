import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import SaleComponent from "./SaleComponent";

class homePage extends React.Component {
    state = {
        sales: []
    }

    componentDidMount() {
        this.getUserSales()
    }

    getUserSales =()=>{
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-user-sales",{
            params:{
                token: cookies.get("logged_in")
            }
        })
            .then((response)=>{
                let sales = response.data
                this.setState({
                    sales:sales
                })
            })
    }

    render() {
        return (
            <div>
                <div className={"componentTitle"}>
                    Home Page
                </div>
                <div>
                    {
                        this.state.sales.length == 0
                            ?
                            <div>
                                You Don't Have Any Sales :(
                            </div>
                            :
                            <div>
                                {
                                    this.state.sales.map(sale =>{
                                            return(
                                                <div>
                                                    <div className={"homePageSale"}>
                                                        <text className={"shopName"}>
                                                            {sale.shop.name}
                                                        </text>
                                                        <SaleComponent sale = {sale} class={"sale"}/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }

}




export default homePage;
