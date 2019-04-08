export const UserContext = {
    username: 'CONTEXT username',
    email: ''
};

export const setUsername = (username) => {
    UserContext.username = username;
};

export function getUsername() {
    return UserContext.username;
}