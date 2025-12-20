import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    // Ledger entry ID
    financeId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // INCOME or EXPENSE
    entryType: {
      type: String,
      enum: ["INCOME", "EXPENSE"],
      required: true
    },

    // Source of transaction
    sourceType: {
      type: String,
      enum: [
        "PAYMENT",
        "SUPPLIER_PAYMENT",
        "OTHER_EXPENSE",
        "ADJUSTMENT"
      ],
      required: true
    },

    // References
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      default: null
    },

    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      default: null
    },

    // Amount
    amount: {
      type: Number,
      required: true,
      min: 0
    },

    currency: {
      type: String,
      default: "LKR"
    },

    // Expense category (only for EXPENSE)
    category: {
      type: String,
      enum: [
        "STOCK_PURCHASE",
        "SALARY",
        "RENT",
        "UTILITY",
        "MARKETING",
        "TRANSPORT",
        "OTHER"
      ],
      default: "OTHER"
    },

    // Description
    description: {
      type: String,
      default: ""
    },

    // Date of transaction
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now
    },

    // Who recorded it
    recordedBy: {
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

export default mongoose.model("Finance", financeSchema);
