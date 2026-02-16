const sessionIdToUserIdMap = new Map();

function setUser(Id, userId) {
    sessionIdToUserIdMap.set(Id, userId);
}

function getUser(Id) {
    return sessionIdToUserIdMap.get(Id);
}

module.exports = {
    setUser,
    getUser
}