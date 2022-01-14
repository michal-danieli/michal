import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import HomePage from "./HomePage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import Search from "./Search";
import Settings from "./Settings";
import StoresList from "./StoresList";
import axios from "axios";
import SignUp from "./SignUp";
import Shop from "./Shop";

class App extends React.Component {

  state = {
    isLoggedIn: false,
    token: "",
    newUser: false,
    shopList: [],
    messageFromServer : ""
  }

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("logged_in")) {
      this.setState({
        isLoggedIn: true,
        token: cookies.get("logged_in")
      })

    }

    const ws = new WebSocket("ws://localhost:8989/stream?token=" + this.state.token + "&o=7791");
    ws.onmessage = (message) =>{
        let data = JSON.parse(message.data)
        this.setState({
            messageFromServer : data
        })
    }
    this.getAllStores()
  }

  getAllStores = () => {
    axios.get("http://localhost:8989/getAllShops")
        .then((response) => {
          let shopList = response.data
          this.setState({
            shopList: shopList
          })
        })
  }

  render() {
    return (
        <div>
          <BrowserRouter>
            {
              this.state.isLoggedIn ?
                  <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                    <NavigationBar/>
                    <Route path={"/"} component={HomePage} exact={true}/>
                    <Route path={"/home-page"} component={HomePage} exact={true}/>
                    <Route path={"/stores-List"} component={StoresList} exact={true}/>
                    <Route path={"/search"} component={Search} exact={true}/>
                    <Route path={"/settings"} component={Settings} exact={true}/>
                    <Route path={"/SignUp"} component={SignUp} exact={true}/>
                    <Route path={"/stores-List/:id"} component= {Shop} exact= {true}/>
                  </div>
                  :
                  <div>
                    <Route path={"/"} component={LoginPage} exact={true}/>
                    <Route path={"/SignUp"} component={SignUp} exact={true}/>
                  </div>
            }
          </BrowserRouter>
            <div>
                message from server:
            </div>
            {this.state.messageFromServer}
        </div>
    )
  }

}

export default App;
