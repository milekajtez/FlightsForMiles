import userService from "../../../services/UserService";

export const userRegistration = (newUser) => (/*dispatch*/) =>
  new Promise(function (resolve, reject) {
    userService
      .userRegistration(newUser)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const confirmRegistration = (username) => () =>
  new Promise(function (resolve, reject) {
    userService
      .confirmRegistration(username)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
