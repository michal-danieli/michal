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
                <div className={"title"}>
                    Home Page
                </div>
                <div>
                    {
                        this.state.sales.map(sale =>{
                            return(
                                <div>
                                    <div>
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
            </div>
        )
    }

}




export default homePage;
