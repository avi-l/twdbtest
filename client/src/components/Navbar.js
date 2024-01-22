import React, { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { HomeIcon, UserIcon, SearchIcon, MenuIcon } from "@heroicons/react/solid";
import Tweets from "./ChildComponents/Tweets";
import UserNames from "./ChildComponents/UserNames";
import UsersProfilesAndTweets from "./ChildComponents/UsersProfilesAndTweets";
import FileUpload from "./CreateComponents/FileUpload";
import CreateProfile from "./CreateComponents/CreateProfile";
import UpdateTweets from "./CreateComponents/UpdateTweets";
import UpdateProfile from "./CreateComponents/UpdateProfile";
import EditImage from "./CreateComponents/EditImage";

const Navbar = (props) => {
  const { user } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <button className="lg:hidden block" onClick={toggleSidebar}>
        <MenuIcon className="h-6 w-6" />
      </button>

      <ul className={`bg-blue-50 border border-blue-500 p-4 w-40 ${sidebarOpen ? 'hidden lg:flex' : 'flex'}`}>
        <div key={user.id} className={sidebarOpen ? 'lg:w-64' : 'w-16'}>
          <li>
            <Link to="/dashboard/tweets" className="flex items-center">
            <div className="flex items-center">
                <HomeIcon className="h-6 w-6" /> 
              </div>
              <span className="ml-2 font-bold">Home</span>
            </Link>
          </li>
          <li>
            <Link to={{ pathname: `/dashboard/user/${user.name}/${user.id}` }} className="flex items-center">
            <div className="flex items-center">
              <UserIcon className="h-6 w-6" />
              </div>
              <span className="ml-2 font-bold">Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/users/" className="flex items-center">
            <div className="flex items-center">
              <SearchIcon className="h-6 w-6" />
              </div>
              <span className="ml-2 font-bold">Search</span>
            </Link>
          </li>
        </div>
      </ul>
      <Switch>
        <Route path="/dashboard/tweets">
          <Tweets {...props} />
        </Route>
        <Route
          path="/users/"
          render={(routeProps) => <UserNames {...routeProps} user={user} />}
        />
        <Route
          path="/dashboard/user/:name/:id"
          render={(routeProps) => (
            <UsersProfilesAndTweets
              {...routeProps}
              name={props.name}
              createdAt={user.createdAt}
            />
          )}
        />
        <Route
          path="/dashboard/tweet/:id/update"
          render={(routeProps) => <UpdateTweets {...routeProps} user={user} />}
        />
        <Route
          path="/user/:name/:id/update"
          render={(routeProps) => <UpdateProfile {...routeProps} />}
        />
        <Route
          path="/dashboard/user/create"
          render={(routeProps) => <CreateProfile {...routeProps} user={user} />}
        />
        <Route
          path="/dashboard/user/upload"
          render={(routeProps) => <FileUpload {...routeProps} user={user} />}
        />
        <Route
          path="/user/upload/:name/:id/edit"
          render={(routeProps) => <EditImage {...routeProps} user={user} />}
        />
      </Switch>
    </div>
  );
};

export default Navbar;
