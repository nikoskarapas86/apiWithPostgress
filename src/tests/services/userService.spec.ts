import { UserInterface } from "../../interfaces/User";
import { UserService } from "../../services/userService";

const userService: UserService = new UserService();
describe("UserService methods in test", () => {
  const user: UserInterface = {
    firstName: "nik",
    lastName: "karapas",
    password: "fermiDirac",
  };

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

  async function deleteUser(id: number) {
    return userService.deleteUser(id);
  }

  it("create method should create a user", async () => {
    const newUser: UserInterface = await userService.createUser(user);

    if (newUser) {
      expect(user.firstName).toBe(newUser.firstName);
      expect(user.lastName).toBe(newUser.lastName);
    }
    newUser.id && (await deleteUser(newUser.id));
  });
  it("remove method should remove the user", async () => {
    const newUser: UserInterface = await userService.createUser(user);

    newUser.id && (await deleteUser(newUser.id));

    const listOfUsers = await userService.getUsers();

    expect(listOfUsers).toEqual([]);
  });
});
