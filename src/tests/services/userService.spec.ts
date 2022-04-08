import { UserService } from "../../services/userService";

const userService: UserService = new UserService();
describe("UserService test", () => {
  it(" method getUsers  should exist", () => {
    expect(userService.getUsers).toBeDefined();
  });
  it(" method getUserById  should exist", () => {
    expect(userService.getUserById).toBeDefined();
  });

  it("method createUser  should exist", () => {
    expect(userService.createUser).toBeDefined();
  });
  it("method deleteUser  should exist", () => {
    expect(userService.deleteUser).toBeDefined();
  });
});
