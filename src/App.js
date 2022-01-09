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
    shopList: []
  }

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get("logged_in")) {
      this.setState({
        isLoggedIn: true,
        token: cookies.get("logged_in")
      })
    }

    this.getAllStores()

    // axios.get("http://127.0.0.1:8989/check_if_new_user",{
    //   params:{
    //     username:this.state.username
    //   }
    // }).then((response) => {
    //   this.setState({
    //     newUser: response.data
    //   })
    // })
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
        </div>
    )
  }

}

export default App;
