const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'John',
            room: 'node'
        }, {
            id: '2',
            name: 'Jen',
            room: 'react'
        }, {
            id: '3',
            name: 'Mike',
            room: 'node'
        }];
    });

    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'john',
            room: 'dev'
        }
        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const userId = '1';
        const user = users.removeUser(userId);

        expect(user.id).toEqual(userId);
        expect(users.users.length).toEqual(2);
    });

    it('should not remove user', () => {
        const userId = '5';
        const user = users.removeUser(userId);

        expect(user).toEqual(undefined);
        expect(users.users.length).toEqual(3);
    });

    it('should find user', () => {
        const userId = '1';
        const user = users.getUser(userId);

        expect(user.id).toEqual(userId);
    });

    it('should not find user', () => {
        const userId = '4';
        const user = users.getUser(userId);

        expect(user).toEqual(undefined);
    });

    it('should return names for react', () => {
        const userList = users.getUserList('react');

        expect(userList).toEqual(['Jen']);
    });
});