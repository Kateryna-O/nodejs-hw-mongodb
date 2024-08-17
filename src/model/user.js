import { Schema, model } from 'mongoose';

const usersShema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

usersShema.method.toJSON = function () {
  const obj = this.Object();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersShema);
