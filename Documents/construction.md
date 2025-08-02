# Echomate Backend Architecture & Construction Plan (Simplified)

This document outlines a simple, cost-effective, and direct architecture that maps precisely to the core user scenario.

## 🏗️ Core User Scenario
1.  A **User** signs up and gets a unique `userId`.
2.  The user updates their **Profile** (name, description, pictures). These changes are saved against their `userId`.
3.  The user creates a **Post** (text + image), which gets a unique `postId` and is linked to their `userId`. The user's `postsCount` goes up.
4.  Another user **Likes** that post. The post's `likesCount` goes up, and the original poster's `likesReceivedCount` goes up.
5.  The second user can **Unlike** the post, and the counts reverse.
6.  The original user can **Delete** their post, and their `postsCount` goes down.

## 📦 Database Architecture (DynamoDB - Simple & Direct)
*All tables will use **On-Demand capacity** for minimum cost.*

#### `Users` Table
*One row per user. Holds all profile information.*
```json
{
  "userId": "string (Primary Key)",
  "email": "string",
  "username": "string",
  "fullName": "string",
  "description": "string",
  "oneLiner": "string",
  "profilePicUrl": "string",
  "coverPicUrl": "string",
  "postsCount": "number",
  "likesReceivedCount": "number",
  "createdAt": "timestamp"
}
```

#### `Posts` Table
*One row per post. Links a post to its creator.*
```json
{
  "postId": "string (Primary Key)",
  "userId": "string (The ID of the user who created it)",
  "content": "string (e.g., 'this is a good day')",
  "imageUrl": "string (The link to the post's image in S3)",
  "likesCount": "number",
  "createdAt": "timestamp"
}
```

#### `Likes` Table
*A simple log to track who liked which post. Prevents duplicate likes.*
```json
{
  "postId": "string (Partition Key)",
  "userId": "string (Sort Key)"
}
```
> **Note:** This composite key (`postId` + `userId`) provides a simple and extremely efficient way to check if a user has already liked a post and to add/remove a like.

---

## 📸 Media Storage Architecture (S3 - Simple & Organized)

#### Bucket Structure
*No temporary folders. A clean, direct structure.*
```plaintext
echomate-media/
  ├── profile-pictures/
  │   └── {userId}.jpg      // A user's profile picture is named after their userId.
  ├── cover-pictures/
  │   └── {userId}.jpg      // A user's cover picture is also named after their userId.
  ├── post-images/
  │   └── {postId}.jpg      // An image for a post is named after the postId.
```
> **Note:** This structure makes it incredibly easy to locate any media asset just by knowing the user's ID or the post's ID.

---

## 🔄 Data Flow for Key Actions

#### Liking a Post (Simplified Flow)
1.  **Frontend:** User clicks "Like" on a post (`postId`).
2.  **API Call:** Request is sent to the `/posts/{postId}/like` endpoint.
3.  **Lambda Function:**
    *   **Step 1: Create a `Like` record.** Adds a new item to the `Likes` table with the `postId` and the `userId` of the person who clicked like. (If this fails because the record already exists, it means the user already liked it, so we can stop).
    *   **Step 2: Increment `Posts` table.** Atomically increases the `likesCount` for the `postId`.
    *   **Step 3: Increment `Users` table.** Atomically increases the `likesReceivedCount` for the post's original author.
4.  **Response:** Lambda returns success.

#### Deleting a Post (Simplified Flow)
1.  **Frontend:** User clicks "Delete" on their own post (`postId`).
2.  **API Call:** Request is sent to the `/posts/{postId}` endpoint with a `DELETE` method.
3.  **Lambda Function:**
    *   **Step 1: Decrement `Users` table.** Atomically decreases the `postsCount` for the user.
    *   **Step 2: Delete media from S3.** Deletes the image from the `post-images/` folder.
    *   **Step 3: Delete the post.** Deletes the item from the `Posts` table.
    *   *(Note: We can also run a background job to clean up any likes associated with the deleted post later, to keep the user's experience fast).*
4.  **Response:** Lambda returns success.

---

## 🚀 Deployment & Security
*The rest of the architecture (API Gateway, Monolithic Lambda, Cognito, AWS Amplify Hosting) remains the same as it is already optimized for simplicity and low cost.*
