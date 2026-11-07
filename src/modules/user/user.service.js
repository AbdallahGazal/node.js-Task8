import {
  deleteOne,
  findOne,
  updateOne,
} from "../../common/repository/db.repository.js";
import { UserModel } from "../../DB/models/user.model.js";

export const updateUser = async (userId, inputs) => {
  if (typeof inputs != "object" || Object.keys(inputs).length < 1)
    throw new Error("No fields entered to update", { cause: { status: 400 } });
  inputs.password = undefined;
  return await updateOne({
    model: UserModel,
    filter: { _id: userId },
    update: { $set: inputs, $inc: { __v: 1 } },
    options: {
      runValidators: true,
    },
  });
};

export const deleteUser = async (userId) => {
  return await deleteOne({ model: UserModel, filter: { _id: userId } });
};
export const findUser = async (userId) => {
  return await findOne({
    model: UserModel,
    filter: { _id: userId },
    projection: { password: 0 },
  });
};
