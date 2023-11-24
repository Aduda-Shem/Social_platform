import React from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  TabContent,
  TabPane,
  CardHeader,
  CardBody,
} from "reactstrap";
import classnames from "classnames";
import Feed from "./Account/Feed";
import Users from "./Account/Users";
import MyPosts from "./Account/MyPosts";
import Profile from "./Auth/Profile";
import Subscription from "../components/Account/subscription";
import Following from "../components/Account/FollowingPosts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = ({
  isLoggedIn,
  isPremiumUser,
  remainingFreePosts,
  activeTab,
  setActiveTab,
  handleLogout,
  setShowLogin,
}) => {
  const tabs = [
    { id: "feed", label: "Feed", component: <Feed isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} remainingFreePosts={remainingFreePosts} /> },
    { id: "Users", label: "Users", component: <Users isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} /> },
    { id: "myPosts", label: "Posts", component: <MyPosts isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} /> },
    { id: "profile", label: "Profile", component: <Profile /> },
    { id: "payment", label: "Payment", component: <Subscription /> },
    { id: "following", label: "Following", component: <Following isLoggedIn={isLoggedIn} /> },
  ];

  return (
    <>
      <Card className="bg-gray-900 text-white p-8 mb-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to{" "}
          <span className="text-blue-500">GR4HNM Social Platform</span>
        </h1>
        {!isLoggedIn && (
          <Row>
            <Col md={12} className="text-center mt-3">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 hover:shadow-lg"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
            </Col>
          </Row>
        )}
      </Card>

      <Card className="p-4 bg-white mb-4 rounded-lg shadow-md">
        <CardHeader className="bg-gray-200">
          <Nav pills className="flex items-center justify-center space-x-4">
            {tabs.map(tab => (
              <NavItem key={tab.id}>
                <NavLink
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowLogin(false);
                  }}
                  className={classnames("cursor-pointer text-lg font-bold", {
                    "text-blue-500": activeTab === tab.id,
                  })}
                >
                  {tab.label}
                </NavLink>
              </NavItem>
            ))}
            <NavItem className="ml-auto">
              <Button
                onClick={() => (isLoggedIn ? handleLogout() : setShowLogin(true))}
                className={classnames("cursor-pointer text-lg font-bold", {
                  "bg-red-500 text-white": isLoggedIn,
                  "bg-blue-500 text-white": !isLoggedIn,
                })}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </NavItem>
          </Nav>
        </CardHeader>

        <CardBody className="scrollable-content overflow-y-auto overflow-x-hidden" style={{ maxHeight: "1000px", height: "fit-content" }}>
          <TabContent>
            {tabs.map(tab => (
              <TabPane key={tab.id}>
                {activeTab === tab.id && tab.component}
              </TabPane>
            ))}
          </TabContent>
        </CardBody>
      </Card>
      <ToastContainer />
    </>
  );
};

export default HomePage;
