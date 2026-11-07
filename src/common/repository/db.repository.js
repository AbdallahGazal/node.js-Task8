import { UserModel } from "../../DB/models/user.model.js";

export const create = async ({ model, data = [], options = {} } = {}) => {
  return await model.create(data, options);
};
export const createOne = async ({ model, data = [], options = {} } = {}) => {
  const [result] = await model.create([data], options);
  return result;
};

export const findById = async ({ model, projection, id, options } = {}) => {
  return await model.findById(id, projection, options);
};

export const findOne = async ({
  model,
  filter = {},
  projection = {},
  options = {},
} = {}) => {
  return await model.findOne(filter, projection, options);
};
export const find = async ({
  model,
  filter = {},
  projection = {},
  options = {},
} = {}) => {
  return model.find(filter, projection, options);
};
export const countDocuments = async ({
  model,
  filter = {},
  options = {},
} = {}) => {
  return model.countDocuments(filter, options);
};
export const findOneAndUpdate = async ({
  model,
  filter = {},
  update,
  options,
} = {}) => {
  return model.findOneAndUpdate(filter, update, options);
};
export const findOneAndReplace = async ({
  model,
  filter = {},
  replacement,
  options,
} = {}) => {
  return model.findOneAndReplace(filter, replacement, options);
};

export const updateOne = async ({
  model,
  filter,
  update,
  options = {},
} = {}) => {
  return await model.updateOne(filter, update, options);
};

export const UpdateMany = async ({
  model,
  filter = {},
  update,
  options = {},
} = {}) => {
  return await model.updateMany(filter, update, options);
};
export const deleteOne = async ({ model, filter, options = {} } = {}) => {
  return await model.deleteOne(filter, options);
};
export const deleteMany = async ({ model, filter, options = {} } = {}) => {
  return await model.deleteMany(filter, options);
};
