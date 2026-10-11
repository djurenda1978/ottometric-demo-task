import { test, expect, type APIResponse } from '@playwright/test';
import { UserConnector } from '@/api/connectors/UserConnector';
import { type UserResponse } from '@/api/models/responses/UserResponse';
import { Given, When, Then, And } from '@/utils/bdd';

test.describe('GoRest Users API', () => {
    let userConnector: UserConnector;
    let response: APIResponse;
    let users: UserResponse[];

    test.beforeEach(async ({ request }) => {
        await Given('the Users API client is initialized', async () => {
            userConnector = new UserConnector(request);
        });

        await When('user sends a request to retrieve the list of users', async () => {
            response = await userConnector.getUsers();
        });

        await Then('the response status is 200', async () => {
            expect(response.status()).toBe(200);
        });

        users = await response.json();
    });

    test('TEST 1 - Returns at least one user', async () => {
        await And('at least one user is returned', async () => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(0);
        });
    });

    test('TEST 2 - Returns at least one user whose name starts with C', async () => {
        await And("at least one user's name starts with the letter C", async () => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.some(user => user.name.startsWith('C'))).toBe(true);
        });
    });

    test('TEST 3 - Retrieves and displays the list of users in the console', async () => {
        await And('at least one user is returned', async () => {
            expect(Array.isArray(users)).toBe(true);
            expect(users.length).toBeGreaterThan(0);
        });

        await And('the list of users is displayed in the console', async () => {
            console.log(users);
        });
    });

});
