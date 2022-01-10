import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

class search extends React.Component {
    state = {
        searchValue: "",
        sales:[],
        salesOfUser:[]
    }

    onChangeSearch =(e)=>{
        this.setState({
            searchValue: e.target.value
        })
        this.getAllSalesAfterFilter(e.target.value)
    }

    componentDidMount() {
        this.getAllSalesAfterFilter(this.state.searchValue)
        this.getSalesOfUser()
    }


    getSalesOfUser=()=>{
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-user-sales", {
            params:{
                token: cookies.get("logged_in")
            }
        })
            .then((response) =>{
                let salesOfUser = response.data
                this.setState({
                    salesOfUser : salesOfUser
                })
            })
    }

    getAllSalesAfterFilter=(value)=>{
        axios.get("http://localhost:8989/get-filtered-sales" , {
            params:{
                text: value
            }
        })
            .then((response) =>{
                let sales = response.data
                this.setState({
                    sales:sales
                })
            })
    }

    checkUserToSale =(id)=>{
        let connect = false
        this.state.salesOfUser.map((sale)=>{
            return(
                <div>
                    {
                        sale.id == id  &&
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
                this is the search page please find your sale
                <input value={this.state.searchValue} onChange={this.onChangeSearch}/>
                {
                    this.state.sales.map(sale => {
                        return (
                            <div className={this.checkUserToSale(sale.id) ? 'green' : 'red'}>
                                {sale.shop.name}
                                <p></p>
                                {sale.name}
                                <p></p>
                                {sale.description}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}




export default search;
