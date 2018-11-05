//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)


class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);

        return user;
    }
    removeUser(id) {
        const user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        const users = this.users.filter((user) => user.room === room);
        const usersNames = users.map((user) => user.name);

        return usersNames;
    }
}

// const users = new Users();
// users.addUser('1', 'john', 'test');
// users.removeUser('1');
// console.log(users);

module.exports = {Users};