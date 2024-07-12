# Intern-challenge


# MERN Stack Dashboard Coding Challenge

## Objective
Create a dashboard using the MERN (MongoDB, Express, React, Node.js) stack that includes the following features:
- User authentication and profile management
- A community forum for users to share posts and comments
- A score tracker to keep track of user achievements
- Functionality for users to share their scores and achievements
- A responsive UI

## Requirements
1. **User Authentication and Profile Management:**
   - Users should be able to sign up, log in, and log out.
   - Each user should have a profile page displaying their information and scores.

2. **Community Forum:**
   - Users should be able to create posts and comment on others' posts.
   - Posts should display the author, timestamp, and content.
   - Comments should display the author, timestamp, and content.

3. **Score Tracker:**
   - Users should have a score tracker on their profile.
   - Implement a system for users to earn points through predefined actions (e.g., posting, commenting).

4. **Sharing Achievements:**
   - Users should be able to share their scores and achievements on social media platforms.
   - Implement social media sharing buttons on the user's profile page.

5. **Responsive UI:**
   - Ensure the application is responsive and works well on different screen sizes.

## Instructions
1. **Fork this repository** to your own GitHub account.
2. **Clone your forked repository** to your local machine.
3. Create the MERN stack application implementing the requirements mentioned above.
4. **Document your code** and include a `README.md` file with:
   - Instructions on how to set up and run your application.
   - Explanation of the technologies and libraries used.
   - Any additional features or enhancements you have implemented.
5. **Push your code** to your forked repository on GitHub.
6. Submit the link to your forked repository.

## Evaluation Criteria
- **Code Quality:** Clean, readable, and well-documented code.
- **Functionality:** Implementation of all the required features.
- **UI/UX:** A responsive and user-friendly interface.
- **Creativity:** Any additional features or enhancements beyond the basic requirements.
- **Git Usage:** Clear commit history and use of branches.

## Submission Deadline
Please submit your solution by July 15.

## Getting Started
### Prerequisites
- Node.js
- MongoDB
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-github-username/mern-dashboard-challenge.git
   cd mern-dashboard-challenge


### Setup Instructions:

**Client (Frontend - Vite React)**:
- Ensure Node.js is installed.
- Navigate to the `client` folder:
  ```bash
      cd client
      pnpm install
      pnpm build
      pnpm start # or "pnpm dev" for dev server

-  Env variables for client app 
   ```bash
      VITE_SERVER_URL=http://localhost:8000 ## or whatever your port is
      VITE_JWT_SECRET=secret string should be same as backend JWT_SECRET


**Server (Backend - Express.js MongoDB  Prisma)**:
- Ensure Node.js is installed.
- Navigate to the `server` folder:
  ```bash
   cd server
   pnpm install
   pnpm generate
   pnpm build
   pnpm start # or "pnpm dev" for dev server

-  Env variables for server app 
   ```bash
      PORT=your port # (optional) default is 8000 
      VITE_SERVER_URL=http://localhost:8000 
      DATABASE_URL=mongodb url 
      VITE_JWT_SECRET=secret string should be same as    frontent VITE_JWT_SECRET
- The secret can be generated with 
   ```bash
      # Linux
      openssl rand -base64 32

      # windows and Mac
      best of luck 👍
      # jk ... visit this url => https://generate-secret.vercel.app/32
   
`I am using TS for this project which helped me to eleminate unneccessary commenting on code for params and return types.
I also "try" to name my variables and fucntions and in general write my code such that, fellow programmers are able to understand what the code is trying to do, and where I believed the code needed commenting I did comment that part.
`