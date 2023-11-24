import React, { useState, useEffect } from 'react';
import { Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Login from './components/Auth/Login';
import './styles/main.css';
import Footer from './components/Breadcrumbs/Footer';
import HomePage from './components/HomePage';

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
    <Container className="mx-auto max-w-6xl p-4 font-sans w-full h-full max-h-screen bg-gray-100">
      <HomePage
        isLoggedIn={isLoggedIn}
        isPremiumUser={isPremiumUser}
        remainingFreePosts={remainingFreePosts}
        activeTab={activeTab}
        handleLogout={handleLogout}
        handlePremiumUpgrade={handlePremiumUpgrade}
        handleBlockUser={handleBlockUser}
        setShowLogin={setShowLogin}
        setActiveTab={setActiveTab}
      />

      <Modal isOpen={showLogin} toggle={() => setShowLogin(!showLogin)} className="modal-dialog-centered modal-lg">
        <ModalHeader toggle={() => setShowLogin(!showLogin)} className="bg-blue-500 text-white">Login</ModalHeader>
        <ModalBody>
          <Login isOpen={showLogin} toggle={() => setShowLogin(!showLogin)} onLogin={handleLogin} />
        </ModalBody>
      </Modal>

      <Footer />
    </Container>
  );
};

export default App;
