I built a responsive User Management Dashboard using React (Vite) and TypeScript.
This dashboard lets me search and filter users by name, email, or city, and view detailed user information along with their posts fetched from a public API. I used the Context API because is a simple and efficient state management, and this project showcases my focus on clean code, responsive design, and modern React best practices.

Tech Stack:
Framework: react": "^19.2.0"
Language:  "typescript": "~5.9.3",
Styling: Tailwind CSS 4.1
State Management: Context API
Routing: React Router DOM
API: JSONPlaceholder (REST)
Build Tool: Vite 5.4
Deployment: Vercel / Netlify
Features
User List: Search by name/email, filter by city
User Details: View complete info + posts
Responsive Design: Mobile, tablet, desktop
Performance: Lazy loading, memoization, error handling

Project Structure:
src/
 ├─ types/         TypeScript types
 ├─ context/       Global state
 ├─ components/    Reusable UI components
 ├─ pages/         Page containers
 ├─ hooks/         Custom hooks
 └─ App.tsx        Root component

Installation
git clone https://github.com/yourusername/user-dashboard.git
cd user-dashboard
npm install
npm run dev


Open http://localhost:5173
in your browser.
Deployment
Vercel
npm install -g vercel
vercel
Build: npm run build
Connect GitHub repo → Auto-deploy
Usage
Search users by name or email
Filter users by city
Click a user card to view details and posts

 I hits all assessment requirements: tech stack, features, setup, deployment, and usage.
