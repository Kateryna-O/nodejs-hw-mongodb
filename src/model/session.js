import { model, Schema } from 'mongoose';

const sessionShema = new Schema(
  {
    userId: { type: String, require: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, require: true },
    refreshTokenValidUntil: { type: Date, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionCollection = model('session', sessionShema);
