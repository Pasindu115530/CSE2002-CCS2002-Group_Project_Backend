import mongoose from "mongoose";

const quotationItemSchema = new mongoose.Schema(
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
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const quotationSchema = new mongoose.Schema(
  {
    // Human-readable quotation ID
    quotationId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Linked request
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true
    },

    // Who created the quotation (Admin or Supplier)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Quotation target
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

    // Items & pricing
    items: {
      type: [quotationItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "At least one item is required"]
    },

    // Price summary
    subTotal: {
      type: Number,
      required: true
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    discountAmount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true
    },

    // Validity period
    validFrom: {
      type: Date,
      required: true
    },
    validUntil: {
      type: Date,
      required: true
    },

    // Status lifecycle
    status: {
      type: String,
      enum: [
        "DRAFT",
        "SENT",
        "ACCEPTED",
        "REJECTED",
        "EXPIRED"
      ],
      default: "DRAFT"
    },

    // Notes
    termsAndConditions: {
      type: String,
      default: ""
    },
    adminNotes: {
      type: String,
      default: ""
    },

    // Soft delete
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // createdAt = quotation date
  }
);

export default mongoose.model("Quotation", quotationSchema);
