const FOLLOWED_USERS_KEY = 'followedUsers';

export const getFollowedUsers = () => {
  const followedUsers = localStorage.getItem(FOLLOWED_USERS_KEY);
  return followedUsers ? JSON.parse(followedUsers) : [];
};

export const followUser = (userId) => {
  const followedUsers = getFollowedUsers();
  if (!followedUsers.includes(userId)) {
    followedUsers.push(userId);
    localStorage.setItem(FOLLOWED_USERS_KEY, JSON.stringify(followedUsers));
  }
};

export const unfollowUser = (userId) => {
  let followedUsers = getFollowedUsers();
  followedUsers = followedUsers.filter((id) => id !== userId);
  localStorage.setItem(FOLLOWED_USERS_KEY, JSON.stringify(followedUsers));
};