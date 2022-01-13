import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import SaleComponent from "./SaleComponent";

class Shop extends React.Component {
    state = {
        id: this.props.match.params.id,
        sales : [],
        shop:[]
    }
    componentDidMount() {
        this.getShopById()
        this.getAllSalesOfShop()
    }

    getShopById = ()=>{
        axios.get("http://localhost:8989/get-shop-by-id",{
            params:{
                shopId: parseInt(this.state.id)
            }
        })
            .then((response)=>{
                const shop = response.data
                this.setState({
                    shop:shop
                })
            })
    }



    getAllSalesOfShop = () =>{
        axios.get("http://localhost:8989/get-all-sales-of-shop",{
            params:{
                shopId: parseInt(this.state.id)
            }
        })
            .then((response)=>{
                const sales = response.data
                this.setState({
                    sales:sales
                })
            })
    }

    render() {
        return (
            <div>
                <p></p>
                shop name:
                <p> </p>
                {
                    this.state.shop.name
                }
                {
                    this.state.sales.map(sale =>{
                        return(
                            <SaleComponent shopName={sale.shop.name} saleDescription = {sale.description}/>

                        )
                    })
                }

            </div>
        )
    }

}




export default Shop;
