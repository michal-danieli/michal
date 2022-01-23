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
    saleStarted : "",
    saleEnded: ""
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("logged_in")
    if (cookies.get("logged_in")) {
      this.setState({
        isLoggedIn: true,
        token: token
      })
    }
    const ws = new WebSocket("ws://localhost:8989/stream?token="+token);
    ws.onmessage = (message) =>{
        const data = JSON.parse(message.data)
        const saleStarted = data.start
        const saleEnded = data.end
        this.setState({
            saleStarted : saleStarted,
            saleEnded : saleEnded
        })
        if (saleStarted !=null)
            alert(saleStarted)
        if (saleEnded != null)
            alert(saleEnded)
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
        <div className={"main"}>
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
                  <div className={"main"}>
                    <Route path={"/"} component={LoginPage} exact={true}/>
                    <Route path={"/SignUp"} component={SignUp} exact={true}/>
                  </div>
            }
          </BrowserRouter>
        </div>
    )
  }

}

export default App;
