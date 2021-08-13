import { UserService } from '../../../src/services';
import { UserRepositoryMock } from '../../mocks';
import UserModelMock from '../../mocks/user/user.model.mock';
import db from '../../../src/config/connection';

const { user, users } = UserModelMock;

describe("User Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should find a user by id", async() => {
        const UserRepository = UserRepositoryMock;
        UserRepository.get.mockReturnValue(user);

        const _userService = new UserService(UserRepository);
        const expected = await _userService.get(user.id);
        expect(expected).toMatchObject(user);
    });
    db.close();
});