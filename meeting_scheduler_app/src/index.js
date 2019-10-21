import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";
import { Route,Switch,Redirect,BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import AdminLayout from "./layouts/Admin.jsx";//Changed path from layouts/Admin.jsx to ./layouts/Admin.jsx
import config from "./config";
import "./index.css";

// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";



Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <Router>

<Switch>
    <App />
    <Route path="/admin" render={props => <AdminLayout {...props} />} />
    <Redirect from="/" to="/admin/dashboard" />
  
   
</Switch>
  
       
  
    </Router>,

  
  document.getElementById("root")
);
registerServiceWorker();



