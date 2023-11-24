const FOLLOWED_USERS_KEY = 'followedUsers';
const BLOCKED_USERS_KEY = 'blockedUsers';

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

export const getBlockedUsers = () => {
  const blockedUsers = localStorage.getItem(BLOCKED_USERS_KEY);
  return blockedUsers ? JSON.parse(blockedUsers) : [];
};

export const blockUser = (userId) => {
  const blockedUsers = getBlockedUsers();
  if (!blockedUsers.includes(userId)) {
    blockedUsers.push(userId);
    localStorage.setItem(BLOCKED_USERS_KEY, JSON.stringify(blockedUsers));
  }
};

export const unblockUser = (userId) => {
  let blockedUsers = getBlockedUsers();
  blockedUsers = blockedUsers.filter((id) => id !== userId);
  localStorage.setItem(BLOCKED_USERS_KEY, JSON.stringify(blockedUsers));
};

export default { getFollowedUsers, followUser, unfollowUser, getBlockedUsers, blockUser, unblockUser };
