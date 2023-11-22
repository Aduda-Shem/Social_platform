import React, { useState } from 'react';
import { Row, Col, Nav, NavItem, NavLink, Card, Button, TabContent, TabPane, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import classnames from 'classnames';
import Feed from './Account/Feed';
import Following from './Account/Following';
import MyPosts from './Account/MyPosts';
import Profile from './Auth/Profile';

const HomePage = ({
  isLoggedIn,
  isPremiumUser,
  remainingFreePosts,
  activeTab,
  setActiveTab,
  handleLogout,
  handlePremiumUpgrade,
  handleBlockUser,
  setShowLogin,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-500 to-teal-600 p-8 mb-8 rounded-lg shadow-lg text-white">
        <img src="/src/logo.jpg" alt="Logo" className="mb-4 animate__animated animate__fadeInDown" />
        <h1 className="text-3xl font-bold mb-4 animate__animated animate__fadeInUp">
          Welcome to <span className="text-yellow-400">ELewa Social Platform</span>
        </h1>
      </Card>

      <Card className="p-4 bg-gray-100 mb-4 animate__animated animate__fadeIn rounded-lg shadow-md">
        <Nav pills className="flex items-center justify-end space-x-4 animate__animated animate__fadeIn">
          <NavItem>
            <NavLink
              onClick={() => {
                setActiveTab('feed');
                setShowLogin(false);
              }}
              className={classnames('cursor-pointer', { 'text-blue-500': activeTab === 'feed' })}
            >
              Feed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                setActiveTab('following');
                setShowLogin(false);
              }}
              className={classnames('cursor-pointer', { 'text-blue-500': activeTab === 'following' })}
            >
              Following
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => {
                setActiveTab('myPosts');
                setShowLogin(false);
              }}
              className={classnames('cursor-pointer', { 'text-blue-500': activeTab === 'myPosts' })}
            >
              My Posts
            </NavLink>
          </NavItem>
          {isLoggedIn && (
            <>
              <NavItem>
                <NavLink
                  onClick={() => {
                    setActiveTab('profile');
                    setShowLogin(false);
                  }}
                  className={classnames('cursor-pointer', { 'text-blue-500': activeTab === 'profile' })}
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={handleLogout} className="cursor-pointer text-red-500">
                  Logout
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Card>

      <div className="scrollable-content" style={{ maxHeight: '1000px', height: 'fit-content', overflowY: 'auto' }}>
        <TabContent>
          <TabPane>
            {activeTab === 'feed' && (
              <Feed isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} remainingFreePosts={remainingFreePosts} onBlockUser={handleBlockUser} />
            )}
          </TabPane>

          <TabPane>
            {activeTab === 'following' && <Following isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} />}
          </TabPane>

          <TabPane>
            {activeTab === 'myPosts' && <MyPosts isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} />}
          </TabPane>

          <TabPane>
            {activeTab === 'profile' && <Profile />}
          </TabPane>
        </TabContent>
      </div>

      {!isLoggedIn && (
        <Row>
          <Col md={12}>
            <div className="text-center mt-3 animate__animated animate__fadeIn">
              <Button
                className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-full transition duration-500 ease-in-out transform hover:scale-105"
                onClick={() => setShowLogin(true)}
              >
                Already Have an account? <span className="text-black-500">Login</span>
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default HomePage;
