import { UserRepository } from '../../../src/repositories';
import Usuario from '../../../src/models/usuario.model';
import UserModelMock from '../../mocks/user/user.model.mock';

let { user, users } = UserModelMock;
describe("User Repository", () => {
    beforeEach(() => {
      // mockingoose.resetAll();
      jest.clearAllMocks();
});
it("Should find a user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    // mockingoose(User).toReturn(user, "findOne");
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.get(_user._id);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);

});