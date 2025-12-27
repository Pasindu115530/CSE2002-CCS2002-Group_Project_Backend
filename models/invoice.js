import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
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

const invoiceSchema = new mongoose.Schema(
  {
    // Human-readable invoice number
    invoiceId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Relations
    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: true
    },

    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true
    },

    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null
    },

    // Invoice target
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

    // Items
    items: {
      type: [invoiceItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "At least one item is required"]
    },

    // Amount summary
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

    // Invoice dates
    issuedDate: {
      type: Date,
      required: true,
      default: Date.now
    },

    dueDate: {
      type: Date,
      required: true
    },

    // Payment tracking
    paidAmount: {
      type: Number,
      default: 0
    },

    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PARTIALLY_PAID", "PAID"],
      default: "UNPAID"
    },

    // Invoice status
    status: {
      type: String,
      enum: ["DRAFT", "ISSUED", "CANCELLED"],
      default: "ISSUED"
    },

    // Notes
    notes: {
      type: String,
      default: ""
    },

    termsAndConditions: {
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
    timestamps: true
  }
);

export default mongoose.model("Invoice", invoiceSchema);
