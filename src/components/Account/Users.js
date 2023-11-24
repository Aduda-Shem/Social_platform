import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { apiCalls } from "../../Data/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = ({ isLoggedIn }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCalls.fetchUsers();
        setAllUsers(
          response.map((user) => ({
            ...user,
            thumbnailUrl: `https://robohash.org/${user.id}?size=200x200`,
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const handleFollow = (userId) => {
    const userToFollow = allUsers.find((user) => user.id === userId);
    setFollowingUsers((prevFollowing) => [...prevFollowing, userToFollow]);
    setAllUsers((prevAllUsers) =>
      prevAllUsers.filter((user) => user.id !== userId)
    );
    notify(`You started following ${userToFollow.name}`);
    setAnimationClass("transition-transform transform translate-x-0");
  };

  const handleUnfollow = (userId) => {
    const unfollowedUser = followingUsers.find((user) => user.id === userId);
    setFollowingUsers((prevFollowing) =>
      prevFollowing.filter((user) => user.id !== userId)
    );
    setAllUsers((prevAllUsers) => [...prevAllUsers, unfollowedUser]);
    notify(`You unfollowed ${unfollowedUser.name}`);
  };

  const handleBlock = (userId) => {
    const blockedUser = followingUsers.find((user) => user.id === userId);
    setFollowingUsers((prevFollowing) =>
      prevFollowing.filter((user) => user.id !== userId)
    );
    setBlockedUsers((prevBlocked) => [...prevBlocked, blockedUser]);
    notify(`You blocked ${blockedUser.name}`);
  };

  const handleUnblock = (userId) => {
    const unblockedUser = blockedUsers.find((user) => user.id === userId);
    setBlockedUsers((prevBlocked) =>
      prevBlocked.filter((user) => user.id !== userId)
    );
    setFollowingUsers((prevFollowing) => [...prevFollowing, unblockedUser]);
    notify(`You unblocked ${unblockedUser.name}`);
  };

  const notify = (message) => toast.info(message);

  const filteredUsers = allUsers.filter(
    (user) =>
      !followingUsers.some((followingUser) => followingUser.id === user.id)
  );

  return (
    <Container className="mx-auto p-8">
      {!isLoggedIn && (
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">
            Login to connect with other users
          </p>
        </div>
      )}

      {isLoggedIn && (
        <>
          <h2 className="mb-4 text-3xl font-bold">Following</h2>
          <Row className={`items-center ${animationClass}`}>
            {followingUsers.map((user) => (
              <Col
                key={user.id}
                className="mb-4 d-flex flex-column justify-content-between"
              >
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden">
                    <img
                      src={user.thumbnailUrl}
                      className="w-20 h-20 object-cover cursor-pointer rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-gray-600">Email: {user.email}</p>
                  </div>
                </div>
                <div className="mt-auto space-x-2">
                  <Button
                    color="success"
                    className="ml-2 transform translate-x-full transition-transform"
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Unfollow
                  </Button>
                  </div>
                  <div className="mt-auto space-x-2">
                  <Button
                    color="danger"
                    className="ml-2 transform translate-x-full transition-transform"
                    onClick={() => handleBlock(user.id)}
                  >
                    Block
                  </Button>
                </div>
              </Col>
            ))}
          </Row>

          {blockedUsers.length > 0 && (
            <>
              <hr className="my-8 border-t" />
              <h2 className="mb-4 text-3xl font-bold">Blocked Users</h2>
              <Row className={`items-center ${animationClass}`}>
                {blockedUsers.map((user) => (
                  <Col
                    key={user.id}
                    className="mb-4 d-flex flex-column justify-content-between"
                  >
                    <div className="flex items-center">
                      <div className="rounded-full overflow-hidden">
                        <img
                          src={user.thumbnailUrl}
                          className="w-20 h-20 object-cover cursor-pointer rounded-full"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold">{user.name}</h4>
                        <p className="text-gray-600">Email: {user.email}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button
                        color="warning"
                        className="ml-2 transform translate-x-full transition-transform"
                        onClick={() => handleUnblock(user.id)}
                      >
                        Unblock
                      </Button>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}

          <hr className="my-8 border-t" />
          <h2 className="mb-4 text-3xl font-bold"> Recommended Users </h2>
          <Row className={`items-center ${animationClass}`}>
            {filteredUsers.map((user) => (
              <Col
                key={user.id}
                className="mb-4 d-flex flex-column justify-content-between"
              >
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden">
                    <img
                      src={user.thumbnailUrl}
                      className="w-20 h-20 object-cover cursor-pointer rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold">{user.name}</h4>
                    <p className="text-gray-600">Email: {user.email}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button
                    color="primary"
                    className="ml-2 transform translate-x-full transition-transform"
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </Button>
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
