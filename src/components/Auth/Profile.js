import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { apiCalls } from "../../Data/Api";
import { getAuthToken } from "../../components/Auth/auth";

const Profile = () => {
  const [user, setUser] = useState(getAuthToken());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await apiCalls.fetchUserById(user.id);
        const pfpic = `https://robohash.org/${user.username}?size=200x200`;
        setUser({ ...userData, url: pfpic });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) {
      fetchUserData();
    } else {
      console.log("User data not available.");
    }
  }, [user]);

  return (
    <Container className="mx-auto my-8 p-4 bg-white shadow-lg rounded-md max-w-lg">
      <div className="text-center mb-4">
        {user && (
          <div className="relative">
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-80"></div>
            <img
              src={user.url}
              alt="Profile Pic"
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-lg"
            />
          </div>
        )}
        <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
      </div>

      {user && (
        <Row className="mb-6">
          <Col>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong>{" "}
              {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Geolocation:</strong>{" "}
              {`Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}`}
            </p>
          </Col>
        </Row>
      )}

      <div className="text-center mt-6">
        <a
          className="bg-gradient-to-br from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full inline-block hover:from-blue-600 hover:to-purple-600 transition duration-300"
        >
          Edit Profile
        </a>
      </div>
    </Container>
  );
};

export default Profile;
