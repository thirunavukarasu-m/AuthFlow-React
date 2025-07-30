# AuthFlow-React
#### ✨ Features

* UI (Landing, Auth, Product Pages)
* Auth Context with Axios interceptors
* JWT refresh on expiration
* Validations and route protection

#### 🏗️ Setup Instructions

```bash
git clone <repo-url>
cd frontend
npm install
npm run dev
```

#### 📂 Directory Structure

```
src/
├── api/axiosInstance.js     # Axios with interceptors
├── context/AuthContext.jsx  # Auth context provider
├── pages/                   # Login, Signup, Products, Add/Edit, Landing
├── components/              # Navbar, ProductCard, ProtectedRoute
├── App.jsx / main.jsx       # Router setup
```

#### 🔐 Auth Flow

* Tokens stored in localStorage
* Auto-refresh with refresh token when access token expires
* Redirect to login if refresh fails

#### 🚧 Pages

| Page         | Path        | Description            |
| ------------ | ----------- | ---------------------- |
| Landing      | `/`         | Public welcome page    |
| Login        | `/login`    | User login             |
| Signup       | `/signup`   | User registration      |
| Products     | `/products` | Product list (private) |
| Add Product  | `/add`      | Add new product        |
| Edit Product | `/edit/:id` | Edit existing product  |