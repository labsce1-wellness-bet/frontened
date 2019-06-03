import React from "react";
import { Route } from "react-router-dom";
import Home from "views/home/Home";
import Callback from "views/callback/Callback";
import Auth from './Auth/Auth'; //Auth0 code

//run auth0
const auth = new Auth();
auth.login();

//The name of the tab
document.title = 'Wellness Bet deploy';

const App: React.FC = () => {
    return (
        <div className="App">
            <script type="text/javascript" src="node_modules/auth0-js/build/auth0.js"></script>
            <Route exact path="/" component={Home} />
            <Route exact path="/callback" component={Callback} />
            <Route exact path="/dashboard" component={Dashboard} />
        </div>
    );
};

export default App;
