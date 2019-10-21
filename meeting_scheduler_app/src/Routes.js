import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import Notes from "./containers/Notes";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewNote from "./containers/NewNote";
import Dashboard1 from "./containers/Dashboard";
import NewMeeting from "./containers/NewMeeting";
import NotFound from "./containers/NotFound";
import Settings from "./containers/Settings";
import ChangeEmail from "./containers/ChangeEmail";
import ResetPassword from "./containers/ResetPassword";
import ChangePassword from "./containers/ChangePassword";
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Upgrade from "views/Upgrade.jsx";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />



    
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/meeting"
     exact
      component={NewMeeting}
      props={childProps}
   
    />
    <UnauthenticatedRoute
      path="/login/reset"
      exact
      component={ResetPassword}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/dashboard1"
      // exact
      component={Dashboard1}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/admin/dashboard"
      name= "Dashboard"
      // exact
      component={Dashboard}
      icon= "pe-7s-graph"
      props={childProps}
      layout= "/admin"
    />
     <UnauthenticatedRoute
      path="admin/user"
      name= "User Profile"
      // exact
      component={UserProfile}
      icon= "pe-7s-user"
      props={childProps}
      layout= "/admin"
    />
     <UnauthenticatedRoute
      path="/admin/table"
      name= "Table List"
      // exact
      component={TableList}
      icon= "pe-7s-note2"
      props={childProps}
      layout= "/admin"
    /> 
    <UnauthenticatedRoute
    path="/admin/typography"
    name= "Typography"
    // exact
    component={Typography}
    icon = "pe-7s-news-paper"
    props={childProps}
    layout= "/admin"
  />
 <UnauthenticatedRoute
    path="/admin/icons"
    name= "Icons"
    // exact
    component={Icons}
    icon= "pe-7s-science"
    props={childProps}
    layout= "/admin"
  />
<UnauthenticatedRoute
    path="/maps"
    name= "Maps"
    // exact
    component={Maps}
    icon= "pe-7s-map-marker"
    // props={childProps}
    layout= "/admin"
  />
  <UnauthenticatedRoute
    path="/upgrade"
    name= "Upgrade to PRO"
    // exact
    component={Upgrade}
    icon= "pe-7s-rocket"
    // props={childProps}
    layout= "/admin"
  />
    

    {/* changed from authenticated to unauthenticated */}
    <UnauthenticatedRoute
      path="/settings"
      exact
      component={Settings}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/settings/email"
      exact
      component={ChangeEmail}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/settings/password"
      exact
      component={ChangePassword}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/notes/new"
      exact
      component={NewNote}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/notes/:id"
      exact
      component={Notes}
      props={childProps}
    />


    {/* <UnauthenticatedRoute
      path="/settings"
      exact
      component={Settings}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/settings/email"
      exact
      component={ChangeEmail}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/settings/password"
      exact
      component={ChangePassword}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/notes/new"
      exact
      component={NewNote}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/notes/:id"
      exact
      component={Notes}
      props={childProps}
    />
     */}

    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
