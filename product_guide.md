# ⚙️ MockData Builder - Complete Product Guide

Welcome to the comprehensive guide for MockData Builder, your go-to utility for generating highly realistic, QA-friendly test data on the fly. 

## 1. Navigating the Interface

The MockData Builder features a clean, single-page interface with real-time preview and instant generation.

> [!NOTE]
> *Currently unable to automatically generate live screenshots due to a server capacity issue with the browser subagent. Placeholder visual descriptions are provided below.*

### Data Configuration (3-Tier System)
Instead of a long, confusing list of data types, MockData Builder uses an intuitive 3-tier menu:
- **Data Category**: The high-level type (Email, Phone, JSON, Custom)
- **Sub Category**: The logical grouping (Domains, Regions, E-commerce, API Testing)
- **Format**: The specific variant to generate (e.g., "India (+91)", "Pagination")

## 2. Generating Basic Data

### Email Generation
Need hundreds of test emails for a signup load test? 
1. Set **Category** to `Email`
2. Pick a specific domain or choose `Random Domain`
3. Adjust **Count** (up to 10,000) and **Prefix Length** (3 to 100 characters)

### Phone Generation
1. Set **Category** to `Phone`
2. Pick your region format (e.g., +1, +44, +91)
3. Click "✨ Generate" to get instantly usable numbers.

## 3. Working with JSON Payloads

MockData Builder shines when it comes to structured data. 

### Pre-defined Schemas
Select **JSON** > **E-commerce** > **Order / Checkout** to instantly get an array of realistic order objects:
```json
[
  {
    "orderId": "ORD_xyz123",
    "userId": "USR_abc789",
    "items": [
      { "id": "item_qwer", "price": 100, "qty": 2 }
    ],
    "totalAmount": 300,
    "paymentMethod": "Credit Card",
    "status": "PENDING"
  }
]
```

## 4. The Custom JSON Schema Builder

When pre-defined schemas don't fit your needs, build your own!

1. Select **Custom** > **Schema Builder** > **Custom JSON Schema**.
2. A code editor text area will appear. 
3. Define your object using our built-in magic keywords (`string`, `number`, `boolean`, `email`, `phone`, `date`).

**Example Schema Input:**
```json
{
  "transactionId": "string",
  "customer": {
    "contact": "email",
    "verified": "boolean"
  },
  "score": "number",
  "history": ["date"]
}
```

## 5. Exporting Your Data

Once your data is generated in the output box, you have multiple ways to use it:

- **📋 Copy**: Click the copy button below the output to save it directly to your clipboard. The button gives you a visual "Copied ✅" confirmation.
- **📥 Download Menu**: Click the download button on the top right of the output to reveal options:
  - **📄 JSON**: Downloads the raw JSON array (or text file for plain strings).
  - **📊 CSV**: Automatically flattens JSON objects into a CSV structure, perfect for importing into Excel or database seeds.

## 6. Feedback & Support
At the bottom of the tool, you'll find an expandable **Feedback** section. You can submit feature requests or report bugs anonymously directly through the UI!
