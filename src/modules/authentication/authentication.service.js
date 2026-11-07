import { findOne } from "../../common/repository/db.repository.js";
import { UserModel } from "../../DB/models/user.model.js";

export const signup = async (inputs) => {
  const user = new UserModel(inputs);
  await user.save();
  return user;
};

export const login = (inputs) => {
  return findOne({
    model: UserModel,
    filter: inputs,
    projection: { password: 0 },
  });
};
