import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { apiCalls } from '../../Data/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFollowedUsers, followUser, unfollowUser } from './UserTrack';

const Users = ({ isLoggedIn }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [usersUsers, setUsersUsers] = useState(getFollowedUsers());
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCalls.fetchUsers();
        setAllUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleFollow = (userId) => {
    const userToFollow = allUsers.find((user) => user.id === userId);
    followUser(userId);
    setUsersUsers((prevUsers) => [...prevUsers, userToFollow]);
    notify(`You started following ${userToFollow.name}`);
    setAnimationClass('transition-transform transform translate-y-0');
  };

  const handleUnfollow = (userId) => {
    unfollowUser(userId);
    setUsersUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    const unfollowedUser = allUsers.find((user) => user.id === userId);
    notify(`You unfollowed ${unfollowedUser.name}`);
    setAnimationClass('transition-transform transform translate-y-full');
  };

  const notify = (message) => toast.info(message);

  const filteredUsers = allUsers.filter((user) => !usersUsers.some((followedUser) => followedUser.id === user.id));

  return (
    <Container className="mx-auto p-8">
      {isLoggedIn && (
        <>
          <h2 className="mb-4 text-3xl font-bold text-center">Following</h2>
          <Row className={`items-center ${animationClass}`}>
            {usersUsers.map((user) => (
              <Col key={user.id} className="mb-4">
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden">
                    <img
                      src={`https://robohash.org/${user.username}?size=200x200`}
                      className="w-20 h-20 object-cover cursor-pointer"
                      alt={user.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-gray-600">Email: {user.email}</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center">
                  <Button
                    color="success"
                    className="ml-2 transform translate-y-full transition-transform"
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Unfollow
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <hr className="my-8 border-t" />
          <h2 className="mb-4 text-3xl font-bold text-center">All Users</h2>
          <Row className={`items-center ${animationClass}`}>
            {filteredUsers.map((user) => (
              <Col key={user.id} className="mb-4">
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden">
                    <img
                      src={`https://robohash.org/${user.username}?size=200x200`}
                      className="w-20 h-20 object-cover cursor-pointer"
                      alt={user.name}
                      onClick={() => console.log(`View profile for ${user.name}`)}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-gray-600">Email: {user.email}</p>
                  </div>
                </div>
                <div className="ml-auto flex items-center">
                  {usersUsers.some((followedUser) => followedUser.id === user.id) ? (
                    <Button
                      color="success"
                      className="ml-2 transform translate-y-full transition-transform"
                      onClick={() => handleUnfollow(user.id)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      color="danger"
                      className="ml-2 transform translate-y-full transition-transform"
                      onClick={() => handleFollow(user.id)}
                    >
                      Follow
                    </Button>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </>
      )}

      <ToastContainer />
    </Container>
  );
};

export default Users;
