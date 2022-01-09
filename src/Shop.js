import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";

class Shop extends React.Component {
    state = {
        id: ""
    }
    componentDidMount() {
        const id =this.props.match.params.id;
        this.setState({
            id:id
        })
    }

    render() {
        return (
            <div>
                this is the shop page
                {this.state.id}
            </div>
        )
    }

}




export default Shop;
