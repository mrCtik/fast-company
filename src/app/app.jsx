import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import Users from "./components/layouts/users";

const App = () => {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Route exact path="/" component={Main} />
            </Switch>
        </div>
    );
};

export default App;
