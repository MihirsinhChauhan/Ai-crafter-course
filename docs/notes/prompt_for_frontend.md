# Prompt for Building a React-Based Frontend

This prompt guides the creation of a step-by-step implementation plan for a React-based frontend, stored in a `frontend.md` file. It leverages the outputs from the Generalized Prompt Library for Application Planning, including app functionality, diagrams (app flow, class, sequence), backend architecture, SQL schema, and ER diagram. The plan ensures modularity, scalability, and alignment with the app’s requirements.

## Prompt:

"Create a detailed step-by-step implementation plan for building the frontend of a \[type of app, e.g., task management app, e-commerce platform, social media app\] using React. The plan should be documented in a Markdown file named `frontend.md`. ensure alignment with the app’s functionality, diagrams, backend architecture, SQL schema, and ER diagram. Follow these steps:

 1. **Project Setup**: Specify how to set up a React project for a \[type of app\]. Include the use of Vite or Create React App, installation of dependencies (React, React Router, Tailwind CSS via CDN), and project structure (e.g., src/components, src/pages). Use modern JavaScript (ES6+) and JSX. Provide a sample `index.html` and `package.json`.

 2. **Component Architecture**: Design a modular component hierarchy based on the app flow diagram and wireframes from the planning library. List 5-10 key reusable components (e.g., Navbar, UserCard, FormInput) with their props and responsibilities. Ensure components align with the core functionalities (e.g., \[specific feature, e.g., task creation, product listing\]). Provide a sample component code snippet.

 3. **State Management**: Propose a state management strategy (e.g., React Context, Redux Toolkit) based on the app’s complexity (e.g., \[small/large user base\]). Map state requirements to the SQL schema and ER diagram (e.g., user data, order status). Include a sample Context or Redux store setup.

 4. **API Integration**: Outline how to integrate with the backend APIs defined in the backend architecture (e.g., RESTful endpoints like GET /users, POST /orders). Use `fetch` or `axios` for API calls, handle loading/error states, and implement authentication (e.g., JWT). Provide a sample API call function aligned with a specific endpoint.

 5. **Routing**: Design client-side routing using React Router based on the app flow diagram. Specify routes for key screens (e.g., /home, /profile, /settings) and their corresponding components. Handle protected routes and redirects (e.g., for authentication). Provide a sample `App.jsx` with routing setup.

 6. **Styling**: Implement styling using Tailwind CSS via CDN. Create a consistent design system (e.g., color palette, typography) based on wireframes. Provide a sample styled component using Tailwind classes, ensuring responsiveness for mobile and desktop.

 7. **User Interaction Flows**: Map user interactions from the sequence diagram (e.g., \[specific process, e.g., user registration, payment processing\]) to React components. Describe how to handle form submissions, validation, and feedback (e.g., toast notifications). Avoid `<form>` onSubmit due to sandbox restrictions; use button click handlers instead. Provide a sample form component.

 8. **Testing**: Outline a testing strategy for the frontend. Include unit tests for components (using Jest/React Testing Library) and integration tests for API calls. Specify 3-5 test cases based on critical user flows (e.g., \[specific flow, e.g., login, checkout\]). Provide a sample test case.

 9. **Performance Optimization**: Describe techniques to optimize frontend performance (e.g., lazy loading, memoization, code splitting). Align optimizations with non-functional requirements (e.g., \[specific requirement, e.g., &lt;2s page load\]). Provide a sample optimized component or route.

10. **Deployment**: Propose a deployment plan for the React frontend using a platform like \[Vercel/Netlify\]. Include steps for building the app, setting up environment variables (e.g., API base URL), and ensuring compatibility with the backend deployment. Provide a sample deployment configuration.

### Guidelines:

- Use the CDN for React dependencies (e.g., react, react-dom, react-router-dom) from cdn.jsdelivr.net.
- Ensure the plan is modular, reusable, and scalable for \[specific user volume, e.g., 1,000 to 1M users\].
- Reference the app’s functionality, diagrams, and backend details from the planning library to maintain consistency.
- Include code snippets for each step (e.g., component, API call, test case) in JSX or JavaScript, avoiding markdown code fences within the snippets.
- Use Tailwind CSS for styling, ensuring accessibility and responsiveness.
- Avoid `<form>` onSubmit; use `onClick` handlers for form submissions.
- Use `className` instead of `class` in JSX.
- Ensure the plan is output as a Markdown file (`frontend.md`) with clear headings and step-by-step instructions."

## Expected Output:

The output will be a `frontend.md` file containing a detailed, step-by-step implementation plan for the React-based frontend. It will include code snippets, explanations, and references to the app’s planning outputs to ensure alignment. The plan will be modular, scalable, and ready for implementation.