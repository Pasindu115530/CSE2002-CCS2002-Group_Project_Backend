import mongoose from "mongoose";

const requirementItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    description: {
      type: String,
      default: ""
    }
  },
  { _id: false }
);

const requestSchema = new mongoose.Schema(
  {
    // Auto-generated readable request ID
    requestId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // CUSTOMER or SUPPLIER based requirement
    requestType: {
      type: String,
      enum: ["CUSTOMER", "SUPPLIER"],
      required: true
    },

    // Who created the request
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Customer profile (only for customer requests)
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null
    },

    // Supplier profile (only for supplier requests)
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null
    },

    // Requested items
    items: {
      type: [requirementItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "At least one item is required"]
    },

    // Expected delivery date
    expectedDate: {
      type: Date,
      required: true
    },

    // Request status lifecycle
    status: {
      type: String,
      enum: [
        "PENDING",
        "REVIEWED",
        "QUOTED",
        "APPROVED",
        "REJECTED",
        "ORDERED",
        "COMPLETED"
      ],
      default: "PENDING"
    },

    // Notes
    customerNotes: {
      type: String,
      default: ""
    },
    adminNotes: {
      type: String,
      default: ""
    },

    // Attachments (files)
    attachments: [
      {
        fileName: String,
        fileUrl: String
      }
    ],

    // Soft delete
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

export default mongoose.model("Request", requestSchema);
