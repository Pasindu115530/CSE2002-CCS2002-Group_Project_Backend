import mongoose from "mongoose";

const deliveryItemSchema = new mongoose.Schema(
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
    }
  },
  { _id: false }
);

const deliverySchema = new mongoose.Schema(
  {
    // Human-readable delivery ID
    deliveryId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // DELIVERY TYPE
    deliveryType: {
      type: String,
      enum: ["TO_CUSTOMER", "FROM_SUPPLIER"],
      required: true
    },

    // Relations
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true
    },

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      default: null
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null
    },

    // Parties
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null
    },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null
    },

    // Delivered items
    items: {
      type: [deliveryItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "At least one item is required"]
    },

    // Delivery details
    deliveryDate: {
      type: Date,
      required: true
    },

    receivedDate: {
      type: Date,
      default: null
    },

    deliveryMethod: {
      type: String,
      enum: ["COMPANY_VEHICLE", "COURIER", "SUPPLIER", "CUSTOMER_PICKUP"],
      required: true
    },

    trackingNumber: {
      type: String,
      default: ""
    },

    // Proof
    deliveryProof: {
      fileName: String,
      fileUrl: String
    },

    // Status
    status: {
      type: String,
      enum: [
        "PENDING",
        "DISPATCHED",
        "DELIVERED",
        "CONFIRMED",
        "CANCELLED"
      ],
      default: "PENDING"
    },

    // Notes
    deliveryNotes: {
      type: String,
      default: ""
    },

    receiverNotes: {
      type: String,
      default: ""
    },

    // Who updated
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Soft delete
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Delivery", deliverySchema);
