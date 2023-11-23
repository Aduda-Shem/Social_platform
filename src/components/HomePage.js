import { Row, Col, Nav, NavItem, NavLink, Card, Button, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import Feed from './Account/Feed';
import Users from './Account/Users';
import MyPosts from './Account/MyPosts';
import Profile from './Auth/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subscription from '../components/Account/subscription';

const HomePage = ({
  isLoggedIn,
  isPremiumUser,
  remainingFreePosts,
  activeTab,
  setActiveTab,
  handleLogout,
  setShowLogin,
}) => {

  return (
    <>
      <Card className="bg-gray-900 text-white p-8 mb-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to <span className="text-blue-500">GR4HNM Social Platform</span>
        </h1>
      </Card>

      <Card className="p-4 bg-white mb-4 rounded-lg shadow-md">
        <Nav pills className="flex items-center justify-center space-x-4">
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
                setActiveTab('Users');
                setShowLogin(false);
              }}
              className={classnames('cursor-pointer', { 'text-blue-500': activeTab === 'Users' })}
            >
              Users
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
            <NavLink
              onClick={() => {
                setActiveTab('payment');
                setShowLogin(false);
              }}
              className={classnames('cursor-pointer', { 'text-blue-500': activeTab === 'payment' })}
            >
              Payment
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

      <div className="scrollable-content" style={{ maxHeight: '1000px', height: 'fit-content', overflowY: 'auto', overflowX: 'hidden' }}>
        <TabContent>
          <TabPane>
            {activeTab === 'feed' && (
              <Feed isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} remainingFreePosts={remainingFreePosts} />
            )}
          </TabPane>

          <TabPane>
            {activeTab === 'Users' && <Users isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} />}
          </TabPane>

          <TabPane>
            {activeTab === 'myPosts' && <MyPosts isLoggedIn={isLoggedIn} isPremiumUser={isPremiumUser} />}
          </TabPane>

          <TabPane>
            {activeTab === 'profile' && <Profile />}
          </TabPane>

          <TabPane>
            {activeTab === 'payment' && <Subscription />}
          </TabPane>
        </TabContent>
      </div>

      {!isLoggedIn && (
        <Row>
          <Col md={12} className="text-center mt-3">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4"
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
          </Col>
        </Row>
      )}

      <ToastContainer />
    </>
  );
};

export default HomePage;
