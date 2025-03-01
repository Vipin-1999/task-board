# TaskBoard

TaskBoard is a modern agile project management tool designed to streamline work processes and enhance team collaboration. Modeled after Atlassian's Jira board, TaskBoard offers an intuitive interface for managing tasks and tickets through a drag-and-drop board system. By simplifying ticket creation, filtering, and status tracking, it helps teams stay organized and efficient while planning for future backend integrations and automated suggestions.

## Features

### Implemented Features

- [x] **Creation of Tickets:**  
  Easily create new tickets for tasks and issues.
- [x] **Drag & Drop Tickets:**  
  Rearrange tickets dynamically between different stages.
- [x] **Filtering:**  
  Filter tickets by title, category, reporter, and priority.
- [x] **Alter Ticket Details:**  
  Modify ticket information on the fly.
- [x] **Dynamic Count Update:**  
  Automatically update the count of tickets in each stage.

### Features Yet to Be Implemented

- [ ] **Authenticated Login:**  
  Secure access to the board with user authentication.
- [ ] **Database Connectivity:**  
  Integration with a backend (using either Node.js or Python with Firestore DB) to store tickets and boards.
- [ ] **Addition/Deletion of Containers:**  
  Manage board containers (columns) with options to add or remove them.
- [ ] **Sorting Tickets:**  
  Enhance sorting functionalities for tickets.
- [ ] **Category-wise Usage:**  
  Better categorization and organization of tickets.
- [ ] **Save and Cancel Features:**  
  Proper mechanisms for saving changes or canceling edits.
- [ ] **Advanced Filters:**  
  - Filter by reporter  
  - Filter by priority  
  - Filter by category
- [ ] **Create New Task & Add New Columns:**  
  Route ticket and board creation through the backend.
- [ ] **Separate Boards for Each Group:**  
  Custom boards per group for enhanced organization.
- [ ] **Backend-Driven Suggestions:**  
  Future features to suggest next steps using backend logic.

## Tech Stack

- **Frontend:**  
  - [ReactJS](https://reactjs.org/)  
  - [Material-UI v4](https://v4.mui.com/) (for UI components)  
  - [Materialize CSS](https://materializecss.com/)
- **Drag & Drop:**  
  - [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- **Future Backend:**  
  - Integration with either Node.js or Python, along with [Firestore](https://firebase.google.com/docs/firestore) for database connectivity and user authentication.

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (which includes npm)
- A modern web browser

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Vipin-1999/TaskBoard.git
   cd taskBoard
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
   This project uses external packages like [Material-UI v4](https://v4.mui.com/getting-started/installation/) for UI components and [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) for drag & drop functionality. Refer to their respective installation and troubleshooting guides if needed.

3. **Start the Application:**
   ```bash
   npm start
   ```
   The app will start on [http://localhost:3000](http://localhost:3000) by default.

## Usage

Once the application is running:

- **Create Tickets:**  
  Use the interface to add new tickets and assign details.
- **Drag & Drop:**  
  Rearrange tickets between columns using the intuitive drag & drop feature.
- **Filtering:**  
  Use the built-in filters to search by title, category, reporter, or priority.
- **Edit Tickets:**  
  Click on a ticket to modify its details.

As future features get implemented, look forward to authenticated login, backend connectivity, and enhanced board management options.

## Contributing

Contributions are highly encouraged! If you have suggestions, improvements, or fixes, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push to your fork:
   ```bash
   git commit -m "Add some feature"
   git push origin feature/your-feature-name
   ```
4. Open a pull request detailing your changes.

For detailed contribution guidelines, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).
