import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Business-readable payment ID
    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Payment direction
    paymentType: {
      type: String,
      enum: ["RECEIVED", "SENT"], // Customer pays / Company pays supplier
      required: true
    },

    // Related documents
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      default: null
    },

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      default: null
    },

    // Who made the payment
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

    // Amount details
    amount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      default: "LKR"
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: [
        "CASH",
        "BANK_TRANSFER",
        "CARD",
        "CHEQUE",
        "ONLINE"
      ],
      required: true
    },

    // External reference
    transactionReference: {
      type: String,
      default: ""
    },

    // Payment proof
    paymentProof: {
      fileName: String,
      fileUrl: String
    },

    // Payment date
    paidAt: {
      type: Date,
      required: true
    },

    // Verification
    status: {
      type: String,
      enum: [
        "PENDING",
        "VERIFIED",
        "REJECTED"
      ],
      default: "PENDING"
    },

    // Who verified
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    verificationNotes: {
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
    timestamps: true // createdAt, updatedAt
  }
);

export default mongoose.model("Payment", paymentSchema);
