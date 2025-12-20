import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    // Login email
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    // Hashed password
    password: {
      type: String,
      required: true
    },

    // Role-based access
    role: {
      type: String,
      enum: ["ADMIN", "CUSTOMER", "SUPPLIER"],
      required: true
    },

    // Linked profile (only one used based on role)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    // Auth status
    isVerified: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    // Security
    lastLoginAt: {
      type: Date,
      default: null
    },

    passwordChangedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Auth", authSchema);
