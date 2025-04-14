# ToDo Fullstack App

## A full stack application built with Nodejs and Angular frontend for managing todo tasks

This is a ToDo application designed to help users manage their tasks and stay organized. It provides the following core functionalities:

* **Task Creation:** Users can easily add new tasks, which are persisted in a database.
* **Task Editing:** Already created tasks can be modified as needed and saved.
* **Task Viewing:** Users can conveniently view a comprehensive list of all their tasks.
* **Task Deletion:** Users have the ability to remove tasks as needed.

# System Requirements
Before attempting to run the application locally, ensure that NodeJs and Angular v17 are installed by following these guides
- **Git**: https://github.com/git-guides/install-git
- **NodeJs**: https://nodejs.org/en/download
- **Angular v17**: https://v17.angular.io/guide/setup-local
- **Docker (to spin up provided mysql docker image for database persistence)**: https://docs.docker.com/desktop

# Local Setup
This application comprises both a frontend and backend application. In order to run the project locally, these steps should be followed.

```bash
        # Clone the repository
        git clone git@github.com:nDZIB/bw-todo-app.git

        # Navigate to the repository
        cd bw-todo-app
```
From this root folder of the repository, Open 2 more terminal tabs to setup the 3 components of the application

Database setup (tab 1)
```bash
    # Navigate to db directory
    cd backend/db

    # spin up a mysql database instance
    docker compose up
```
Backend Setup (tab 2)
```bash
    # Navigate to the backend directory
    cd backend

    # Install backend dependencies
    npm install

    # Build backend documentation
    npm run docs

    # Run the backend application
    npm run dev
```

Frontend Setup (tab 3)
```bash
    # Navigate to the frontend directory
    cd frontend

    # Install dependencies
    npm install

    # Run the frontend
    npm run start
```

The frontend application will be accessible at http://localhost:4200 and the REST API's Swagger Documentation at http://localhost:8080/docs

# How to use

This ToDo application incorporates authentication. In order to manage todo tasks, a user must be authenticated,

1. **Account Creation**: In order to create a new account, navigate to http://localhost:4200/sign-up . To create an account, a unique username and password are required
2. **Login**: Once an account is created, a user can login by visiting http://localhost:4200/login . After successful login with username and password, a user is redirected to the tasks dashboard where tasks can be created.


3. **Create a task**: To create a new todo, from the tasks dashboard, click "Add Task". A form is presented on which the user can provided the task's title and description and save
4. **Delete a task**: To delete an existing task, from the tasks dashboard, click the 'Delete' button. After clicking, a suser needs to confirm the deletion. (this is to prevent users from accidentally deleting tasks)
5. **Edit a task**: To update details of a created task, simply click on the "Edit" button on a todo task on the tasks dashboard. After updating fields accordingly, click on the save button.

Attached is a short video walkthrough of the app
[Screencast from 2025-04-14 15-33-42.webm](https://github.com/user-attachments/assets/188cee6b-810d-494e-9834-e748502ee1c9)


# Deployment to GCP
In order to deploy this application to GCP, the following steps can be followed:

- **Create a VPC Network**: Ensure that the firewall rules allow ingress requests to ports 4200 (for the frontend), 8080 (for the backend) and 22 (for ssh)

- **Create a Virtual Machine (linux)**: Under the Networking section, ensure to select the previousely created VPC as the VM's target VPC

- **Install and configure gcloud**: On the local machine, install and configure gcloud to use in managing the created VM

- **SSH into the created VM using gcloud**

- **Install git, Nodejs (preferrably using nvm), docker and docker-compose on the VM**
- **Install Angular v17 on the VM**

- **Clone this git repository**
- **Navigated to the root directory of the app**: cd bw-todo-app
- **Deploy the application stack using docker-compose up -d**


# Next steps
- Improved User Authentication
- Extensive filtering and pagination of tasks
- Task Status and Due dates
- Unit Testing
- kanban-like presentation of tasks by status
- Enhancement of user experience
