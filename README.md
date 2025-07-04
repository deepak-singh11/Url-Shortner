# 🌐 URL Shortener

A full-stack URL Shortener application with user authentication (including Google OAuth), profile management, and detailed URL analytics.

## ✨ Features

- User signup/signin with email/password or Google
- Profile management (update profile, delete account, upload profile image)
- Shorten URLs
- View all created slugs
- See statistics for each slug
- Containerized with Docker for easy deployment

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB
- **Frontend:** React, TypeScript, Tailwind CSS
- **Containerization:** Docker
- **Deployment:** AWS, Vercel

---
## ⚙️ Installation & Usage

Follow these steps to run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/deepak-singh11/Url-Shortner.git

---

## 📡 API Endpoints

Below are the main routes available in the backend.

### 🧑‍💼 User Profile Routes
Base path: `/api/v1/user`

| Method | Endpoint                   | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| POST   | `/signup`                  | Create a new user account             |
| POST   | `/signin`                  | Login with email and password         |
| PUT    | `/update-profile`          | Update user profile *(requires auth)* |
| DELETE | `/delete-profile`          | Delete user account *(requires auth)* |
| POST   | `/profileImage-uploader`   | Upload profile image *(requires auth)* |

---

### 🔑 Google Authentication Routes
Base path: `/auth`

| Method | Endpoint   | Description              |
| ------ | ---------- | ------------------------ |
| GET    | `/google`  | Start Google OAuth flow |

---

### 🔗 URL Routes
Base path: `/api/v1/url`

| Method | Endpoint               | Description                                              |
| ------ | ---------------------- | -------------------------------------------------------- |
| POST   | `/create`              | Create a short URL *(requires auth)*                    |
| GET    | `/allSlugs`            | Retrieve all your slugs *(requires auth)*               |
| GET    | `/slugStats/:slug`     | Get stats for a slug *(requires auth and ownership)*    |


## 📸 Screenshots

![Signup Page](https://github.com/user-attachments/assets/6b669cd7-25bf-480c-bd03-c4d89e52c7fb)
![Login Page](https://github.com/user-attachments/assets/d5dc9299-3d74-4ec7-903f-029371c843f5)
![Homepage](https://github.com/user-attachments/assets/56af59b1-196a-4d52-817a-167e07ecf593)
*![Dashboard](https://github.com/user-attachments/assets/6f4f6298-e6f4-4836-bd74-010e5f7b438c)
![URLStats-1](https://github.com/user-attachments/assets/dc2e4e49-b5a6-45c4-96a9-2d5970e5bda3)
![URLStats-2](https://github.com/user-attachments/assets/48e54d26-0738-4588-a8b0-539cc0cf3b44)
![Profile-1](https://github.com/user-attachments/assets/03ede9f4-f22d-4169-9d24-048c51eba206)
![Profile-2](https://github.com/user-attachments/assets/b4dffde3-7dfe-46cb-92d0-dbe84b57716b)


---

## ✍️ Author

**Deepak Singh**

- [LinkedIn](https://www.linkedin.com/in/deepak-singh-5945a1263/)
- 📧 deepaksinghrajput112002@gmail.com

