# AWS Implementation Guide for Non-Developers
(Simple Step-by-Step Guide for Echomate)

## 🚀 Getting Started with AWS

### First Steps (One-time Setup)
1. Create AWS Account
   - Go to aws.amazon.com
   - Click "Create an AWS Account"
   - Follow sign-up steps
   - Add payment method

2. Security Setup
   - Enable MFA on root account
   - Create IAM user for yourself
   - Save access keys safely

## 📱 Phase 1: User Authentication (AWS Cognito)

### Step 1: Create User Pool
1. Open AWS Console
2. Search for "Cognito"
3. Click "Create User Pool"
4. Basic Settings:
   - Allow email sign-in
   - Allow username sign-in
   - Required attributes: name, email
   - Password minimum length: 8

### Step 2: Configure App Integration
1. Create app client
   - Name it "EchomateApp"
   - Generate client secret: No
2. Set callback URLs:
   - http://localhost:8080 (for development)
   - Your domain (for production)

### Step 3: Save Important Information
- User Pool ID
- App Client ID
- Region

## 💾 Phase 2: Database Setup (DynamoDB)

### Step 1: Create User Table
1. Open DynamoDB console
2. Click "Create table"
3. Settings:
   - Table name: Users
   - Primary key: `userId` (Type: String)
   - Use default settings. The nested `profile` object will be stored as a map.
   - You don't need to define all the nested attributes in the table creation UI. DynamoDB is schema-less, and you'll add the nested JSON when you write data to the table from your Lambda functions.

### Step 2: Create Posts Table
1. Create another table
   - Table name: Posts
   - Primary key: postId
   - Add GSI for userId

### Step 3: Create Likes Table
1. Create table
   - Table name: Likes
   - Primary key: likeId
   - Add GSIs for userId and postId

## 🖼️ Phase 3: Image Storage (S3)

### Step 1: Create Buckets
1. Open S3 console
2. Create bucket for profiles
   - Name: echomate-profiles
   - Region: choose nearest
   - Block public access: Yes

3. Create bucket for posts
   - Name: echomate-posts
   - Same settings as above

### Step 2: Configure CORS
1. Go to bucket permissions
2. Add CORS rule:
```json
{
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "GET"],
    "AllowedOrigins": ["http://localhost:8080"],
    "ExposeHeaders": []
}
```

## 🔌 Phase 4: API Setup (API Gateway & Lambda)

### Step 1: Create Lambda Functions
1. Create User Functions
   - createUser
   - updateProfile
   - getProfile

2. Create Post Functions
   - createPost
   - deletePost
   - likePost

### Step 2: Set Up API Gateway
1. Create new API
   - Name: EchomateAPI
   - Type: REST API
2. Create resources:
   - /users
   - /posts
   - /likes

## 🔒 Basic Security Setup

### Step 1: HTTPS Setup
1. Request Certificate (ACM)
   - Add your domain
   - Validate via DNS

### Step 2: Basic Protection
1. Enable AWS WAF
   - Block common attacks
   - Rate limiting: 1000 requests per IP

## 📝 Important Notes

### Costs to Watch
- S3 storage costs
- DynamoDB usage
- Lambda invocations
- API Gateway calls

### Backup Considerations
1. Enable DynamoDB backups
2. Enable S3 versioning
3. Save configuration details

## 🛠️ Testing Steps

### Local Testing
1. Test user signup
2. Test image upload
3. Test post creation
4. Test likes

### Production Testing
1. Repeat all local tests
2. Test with real users
3. Monitor for errors

## 🚨 Common Issues & Solutions

### Authentication Issues
- Check Cognito settings
- Verify app client ID
- Check callback URLs

### Image Upload Issues
- Check S3 permissions
- Verify CORS settings
- Check file size limits

### API Issues
- Check Lambda logs
- Verify API Gateway settings
- Check error messages

## 📞 Support Resources

### AWS Support
- AWS Documentation
- AWS Support Forums
- AWS Support Plan (if needed)

### Monitoring
1. Set up basic CloudWatch alarms
   - Error rates
   - API latency
   - Cost alerts
