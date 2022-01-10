import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

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
                this is the home page
                <div>
                    {
                        this.state.sales.map(sale =>{
                            return(
                                <div>
                                    shop: {sale.shop.name}
                                    <div>

                                    </div>
                                    description: {sale.description}
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
