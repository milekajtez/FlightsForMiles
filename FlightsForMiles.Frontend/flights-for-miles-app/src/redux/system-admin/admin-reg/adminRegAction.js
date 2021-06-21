import userService from "../../../services/UserService";

export const avioAdminRegistration = (newAvioAdmin) => () =>
  new Promise(function (resolve, reject) {
    userService
      .avioAdminRegistration(newAvioAdmin)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
