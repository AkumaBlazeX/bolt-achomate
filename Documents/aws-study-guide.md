# AWS Implementation Guide for Non-Developers (Simple & Refined)

## 🚀 Getting Started with AWS

### First Steps (One-time Setup)
1. **Create AWS Account** and set up billing alerts.
2. **Security Setup:** Enable MFA and create an IAM user for yourself.

## 🌐 Development Workflow
- **Local:** Run frontend on `http://localhost:8080`.
- **AWS CORS:** Configure Cognito, API Gateway, and S3 to allow requests from `http://localhost:8080`.
- **Deployment:** Use a free-tier service like Vercel or Netlify for the frontend when ready to go live.

## 📱 Phase 1: User Authentication (AWS Cognito)

### Step 1: Create User Pool
1.  **Open AWS Cognito -> User Pools -> Create user pool.**
2.  **Settings:**
    *   Provider types: Cognito user pool
    *   Cognito user pool sign-in options: **Email**
    *   Password policy: Use default settings for simplicity.
    *   Multi-factor authentication: **No MFA** (for MVP).
    *   User account recovery: **Enable self-service account recovery**.
    *   App integration: Name your app client (e.g., `echomate-app-client`), and for "App type," select **Public client**.

### Step 2: Create Post-Confirmation Lambda Trigger
1.  **Open AWS Lambda -> Create function.**
2.  **Function:** Create a simple Node.js function.
3.  **Code:** This function will receive user data from Cognito and create an entry in your DynamoDB `Users` table.
4.  **Connect Trigger:** In Cognito, under the "User pool properties" tab, find "Triggers" and assign your Lambda to the **Post confirmation** trigger.

## 💾 Phase 2: Database Setup (DynamoDB)

### Step 1: Create User Table
1.  **Open DynamoDB -> Tables -> Create table.**
2.  **Settings:**
    *   Table name: `Users`
    *   Partition key: `userId` (Type: String)
    *   Table settings: Choose **On-demand** capacity mode for cost-effectiveness.

### Step 2: Create Posts Table
1.  **Create table:**
    *   Table name: `Posts`
    *   Partition key: `postId` (Type: String)
    *   Table settings: **On-demand** capacity mode.

### Step 3: Create Interactions (Likes) Table
1.  **Create table:**
    *   Table name: `Interactions`
    *   Partition key: `postId` (Type: String)
    *   **Enable "Sort key"** and enter `userId` (Type: String). This creates the composite key.
    *   Table settings: **On-demand** capacity mode.

## 🔄 Phase 3: API Setup (Lambda & API Gateway)

### Step 1: Create the Monolithic Lambda Function
1.  **Open AWS Lambda -> Create function.**
2.  **Settings:**
    *   Function name: `echomate-api-handler`
    *   Runtime: Node.js
    *   Permissions: Create a new role with basic Lambda permissions. We will add DynamoDB/S3 permissions later.
3.  **Code:** Inside this single function, you'll write an entry handler that uses a `switch` statement on `event.httpMethod` and `event.path` to route the request to the correct logic (e.g., `createUser`, `getPost`).

### Step 2: Set Up API Gateway
1.  **Open API Gateway -> REST API -> Build.**
2.  **Settings:** New API, name it `echomate-api`.
3.  **Create Resources:** Create resources like `/posts` and `/users`.
4.  **Create Proxy Integration:** For your resources, create a method (e.g., `POST` on `/posts`). For the integration type, choose **Lambda Function** and set the "Lambda proxy integration" checkbox. Point it to your single `echomate-api-handler` function.
5.  **Authorizer:** Under "Authorizers," create a **Cognito authorizer** and link it to your User Pool. Then, apply this authorizer to your protected API methods.

## 📸 Phase 4: Image Storage (S3)

### Step 1: Create S3 Bucket
1.  **Open S3 -> Buckets -> Create bucket.**
2.  **Settings:**
    *   Bucket name: `echomate-media-YOUR-UNIQUE-ID`
    *   **Block all public access** (keep this checked for security).

### Step 2: Configure Lifecycle Rule for Cleanup
1.  Inside your bucket, go to the **Management** tab.
2.  **Create lifecycle rule:**
    *   Rule name: `TempFileCleanup`
    *   Scope: Apply this rule to a prefix, and specify `temp/`.
    *   Action: **Expire current versions of objects.**
    *   Days after object creation: `1`. This will delete files in `temp/` after 24 hours.

### Step 3: Configure CORS
1.  In your bucket, go to the **Permissions** tab.
2.  Find the CORS configuration and add a rule to allow `PUT` requests from `http://localhost:8080`.
