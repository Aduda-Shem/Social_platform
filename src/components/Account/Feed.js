import React, { useState, useEffect } from 'react';
import { Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Button, Alert } from 'reactstrap';
import classnames from 'classnames';
import Post from './Post';
import PremiumUpgrade from '../Account/Premium';
import MyPosts from './MyPosts';

const Feed = ({ isLoggedIn, isPremiumUser, remainingFreePosts }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    if (!isPremiumUser && remainingFreePosts === 0) {
      setShowLogin(true);
    }
  }, [isPremiumUser, remainingFreePosts]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <Nav pills className="flex-row-reverse">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'feed' })}
                onClick={() => toggleTab('feed')}
              >
                Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'following' })}
                onClick={() => toggleTab('following')}
              >
                Following
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'myPosts' })}
                onClick={() => toggleTab('myPosts')}
              >
                My Posts
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="feed">
              {isLoggedIn ? (
                <>
                  {isPremiumUser ? (
                    posts.map((post) => (
                      <Post key={post.id} data={post} showComments={false} />
                    ))
                  ) : (
                    <>
                      {remainingFreePosts > 0 ? (
                        posts.slice(0, 20).map((post) => (
                          <Post key={post.id} data={post} showComments={false} />
                        ))
                        
                      ) : null}
                    </>
                  )}
                </>
              ) : (
                <PremiumUpgrade />
              )}
            </TabPane>

            <TabPane tabId="following">
              {isLoggedIn ? (
                <>
                  <h2 className="mb-4">Following Users</h2>
                  {followingPosts.map((post) => (
                    <Post key={post.id} data={post} showComment={true} />
                  ))}
                </>
              ) : (
                <PremiumUpgrade />
              )}
            </TabPane>

            <TabPane tabId="myPosts">
              {isLoggedIn ? (
                <MyPosts />
              ) : (
                <PremiumUpgrade />
              )}
            </TabPane>
          </TabContent>
        </Col>
      </Row>
      {showLogin && (
        <Row>
          <Col md={12}>
            <div className="text-center mt-3">
              <Button color="primary" onClick={() => console.log('Redirect to Login')}>Login</Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Feed;
