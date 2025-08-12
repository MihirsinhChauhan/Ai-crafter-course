# Generalized Prompt Library for Application Planning

This prompt library provides a structured set of prompts to guide the planning and development of any application, from simple tools to complex systems. Each section includes example prompts that can be tailored to specific project requirements.

## 1. Planning App Functionality

This section focuses on defining the core features, user stories, and functional requirements of the application. The prompts ensure comprehensive coverage of user needs, system behavior, and scalability considerations.

### Example Prompts:

- **Core Functionality Definition**: "Define the primary features of a \[type of app, e.g., task management app, e-commerce platform, social media app\]. List 5-10 core functionalities, including user roles (e.g., admin, user, guest) and their specific interactions with the app. Ensure the features support scalability for \[small/large user base\]."
- **User Stories**: "Write 5 detailed user stories for a \[type of app\] from the perspective of \[specific user role, e.g., customer, vendor, administrator\]. Each story should follow the format: 'As a \[user role\], I want to \[action\] so that \[benefit\].' Include edge cases and error handling."
- **Non-Functional Requirements**: "Specify 5-7 non-functional requirements for a \[type of app\], such as performance (e.g., response time under \[specific load\]), security (e.g., data encryption standards), and usability (e.g., accessibility compliance). Explain how these align with the app’s goals."
- **Feature Prioritization**: "Create a MoSCoW prioritization table (Must have, Should have, Could have, Won’t have) for the features of a \[type of app\]. Justify the prioritization based on user needs and business objectives."
- **Scalability and Extensibility**: "Describe how the functionality of a \[type of app\] can be designed to scale for \[specific user volume, e.g., 1,000 to 1M users\] and extend to include future features like \[example future features\]. Provide examples of modular design approaches."

## 2. Essential Diagrams and Workflows

This section focuses on creating diagrams to visualize the app’s structure, flow, and interactions. The prompts guide the creation of app flow diagrams, class diagrams, sequence diagrams, and other relevant visuals.

### Example Prompts:

- **App Flow Diagram**: "Create a detailed app flow diagram for a \[type of app\]. Include key user interactions (e.g., login, navigation, core actions) and decision points (e.g., error handling, redirects). Use a tool like \[Lucidchart/Mermaid/Draw.io\] to represent the flow and ensure it covers \[specific scenarios, e.g., onboarding, checkout\]."
- **Class Diagram**: "Design a UML class diagram for a \[type of app\]. Include at least 5-7 key classes, their attributes, methods, and relationships (e.g., inheritance, association, composition). Ensure the diagram supports the app’s core functionality, such as \[specific feature\]."
- **Sequence Diagram**: "Develop a UML sequence diagram for a critical process in a \[type of app\], such as \[specific process, e.g., user registration, payment processing\]. Include actors (e.g., user, server, database), messages, and error handling scenarios."
- **State Diagram**: "Create a state diagram for a \[specific component/feature, e.g., order status in an e-commerce app\]. Show all possible states (e.g., pending, shipped, delivered) and transitions, including triggers and conditions."
- **Wireframe/Prototype**: "Design low-fidelity wireframes for the main screens of a \[type of app\], such as \[specific screens, e.g., homepage, user profile, settings\]. Include annotations for key UI elements and their functionality. Use a tool like \[Figma/Balsamiq\]."

## 3. Backend Architecture

This section focuses on designing the backend architecture, including system components, APIs, and infrastructure considerations. The prompts ensure the architecture is scalable, secure, and maintainable.

### Example Prompts:

- **Architecture Overview**: "Design a high-level backend architecture for a \[type of app\]. Specify the architectural pattern (e.g., microservices, monolithic, serverless), components (e.g., API gateway, service layer, database), and technologies (e.g., Node.js, PostgreSQL). Justify the choices based on \[specific requirements, e.g., scalability, cost\]."
- **API Design**: "Create a RESTful API specification for a \[type of app\]. Include 5-7 key endpoints (e.g., GET /users, POST /orders), their request/response formats, and authentication mechanisms (e.g., JWT, OAuth2). Use OpenAPI/Swagger for documentation."
- **Scalability Plan**: "Describe a scalability strategy for the backend of a \[type of app\]. Include load balancing, caching (e.g., Redis), database sharding, and horizontal scaling approaches. Address how the system handles \[specific load, e.g., 10,000 concurrent users\]."
- **Security Considerations**: "Outline the security architecture for a \[type of app\]. Include measures for data encryption (e.g., TLS, AES-256), user authentication, and protection against common threats (e.g., SQL injection, XSS). Specify compliance requirements (e.g., GDPR, HIPAA)."
- **Deployment Strategy**: "Propose a deployment architecture for a \[type of app\] using \[specific platform, e.g., AWS, Kubernetes\]. Include CI/CD pipelines, containerization (e.g., Docker), and monitoring tools (e.g., Prometheus, Grafana). Explain how it ensures zero-downtime deployments."

## 4. SQL Schema Design

This section focuses on designing a robust and normalized SQL database schema to support the app’s data requirements. The prompts ensure the schema is efficient, scalable, and aligned with the app’s functionality.

### Example Prompts:

- **Database Schema**: "Design a normalized SQL database schema for a \[type of app\]. Include 5-10 tables with their columns, data types, constraints (e.g., primary keys, foreign keys), and indexes. Ensure the schema supports \[specific features, e.g., user management, order tracking\]."
- **Query Optimization**: "Write 5 optimized SQL queries for common operations in a \[type of app\], such as \[specific operations, e.g., retrieving user data, aggregating sales\]. Include indexes and explain plans to demonstrate performance considerations."
- **Data Integrity**: "Define constraints and triggers in the SQL schema for a \[type of app\] to ensure data integrity. For example, enforce \[specific rules, e.g., unique email addresses, cascading deletes\]. Provide sample SQL code."
- **Scalability Considerations**: "Propose a database scaling strategy for a \[type of app\]. Include approaches like read replicas, partitioning, or sharding. Explain how the schema supports \[specific scale, e.g., 1M records\]."
- **Migration Plan**: "Create a database migration plan for a \[type of app\]. Include SQL scripts to add new tables, modify columns, or seed initial data. Ensure backward compatibility and minimal downtime."

## 5. ER Diagram

This section focuses on creating an Entity-Relationship (ER) diagram to visualize the database structure and relationships. The prompts ensure clarity and alignment with the app’s data model.

### Example Prompts:

- **ER Diagram Creation**: "Create an ER diagram for a \[type of app\]. Include 5-10 entities, their attributes, and relationships (e.g., one-to-many, many-to-many). Use \[specific notation, e.g., Chen, Crow’s Foot\] and a tool like \[Mermaid /Lucidchart/Draw.io\]. Annotate key relationships and constraints."
- **Relationship Mapping**: "Map the relationships in the ER diagram for a \[type of app\] to the SQL schema. For each relationship, specify how it is implemented (e.g., foreign keys, junction tables) and provide sample SQL code."
- **Normalization Check**: "Analyze the ER diagram for a \[type of app\] to ensure it meets \[specific normalization level, e.g., 3NF\]. Identify any potential anomalies (e.g., insertion, deletion) and propose refinements."
- **Complex Relationships**: "Design an ER diagram for a \[type of app\] that includes complex relationships, such as \[specific examples, e.g., hierarchical data, polymorphic associations\]. Explain how these are implemented in the database."
- **Data Flow Integration**: "Integrate the ER diagram for a \[type of app\] with the app flow diagram. Show how data moves between entities during key processes (e.g., user signup, order placement). Provide a combined visualization if possible."

## Usage Guidelines

- **Customization**: Replace placeholders like \[type of app\], \[specific feature\], or \[specific user role\] with details relevant to your project.
- **Iterative Refinement**: Use these prompts iteratively to refine the app plan as requirements evolve.
- **Tool Integration**: Leverage tools like Figma, Lucidchart, or Swagger to create diagrams and documentation as specified in the prompts.
- **Scalability and Flexibility**: Ensure prompts are tailored to the app’s scale (e.g., small MVP vs. enterprise system) and technology stack (e.g., web, mobile, hybrid).

This prompt library is designed to be comprehensive and adaptable, enabling developers, architects, and product managers to plan applications systematically.