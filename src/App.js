import React, { useState, useEffect } from 'react';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Button, Card } from 'reactstrap';
import classnames from 'classnames';
import Feed from './components/Account/Feed';
import Following from './components/Account/Following';
import MyPosts from './components/Account/MyPosts';
import PremiumUpgrade from './components/Account/PremiumUpgrade';
import Login from './components/Auth/Login';
import './styles/main.css';
import Footer from './components/Breadcrumbs/Footer';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [remainingFreePosts, setRemainingFreePosts] = useState(20);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsPremiumUser(false);
    setRemainingFreePosts(20);
  };

  const handlePremiumUpgrade = () => {
    setIsPremiumUser(true);
  };

  const handleBlockUser = (userId) => {
    console.log(`User with ID ${userId} blocked.`);
  };

  useEffect(() => {
    if (isLoggedIn && !isPremiumUser && remainingFreePosts === 0) {
      console.log('Paywall should appear.');
    }
  }, [isLoggedIn, isPremiumUser, remainingFreePosts]);

  return (
    <Container className="mx-auto max-w-6xl p-4 font-sans">
      <Card>
        <img src="/src/logo.jpg" alt="Logo" className="mb-4" />
        <h1 className="text-3xl font-bold mb-4 animate__animated animate__fadeInUp">
          Welcome to ELewa Social Platform
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
        </Nav>
      </Card>

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
      </TabContent>

      {!isLoggedIn && (
        <Row>
          <Col md={12}>
            <div className="text-center mt-3 animate__animated animate__fadeIn">
              <Button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-full" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            </div>
          </Col>
        </Row>
      )}

      <Login isOpen={showLogin} toggle={() => setShowLogin(!showLogin)} onLogin={handleLogin} />
      <Footer />
    </Container>
  );
};

export default App;
