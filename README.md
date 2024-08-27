
# .NET Core and Angular Implementation for CSV/Excel File Processing

## Overview

This document outlines the development of a system using **.NET Core** and **Angular** that processes Excel/CSV files via a .NET Core API. The converted JSON data is then returned to the Angular frontend, where it is visualized using **NGX-ECharts**. This project showcases essential software design principles, including separation of concerns, dependency injection, and the strategy pattern.

## Technology Stack

### Backend: .NET Core
- **API Controllers**: Manages HTTP requests.
- **Service Layer**: Contains business logic and file processing strategies.
- **Strategy Pattern**: Utilized for flexible file processing.
- **Error and Exception Handling**: Comprehensive error and exception handling mechanisms are in place to ensure the robustness and reliability of the application.

### Frontend: Angular
- **NGX-ECharts**: For dynamic data visualization.
- **File Upload**: Facilitates user interaction with the system.
- **HTTP Services**: Separate services are created for handling HTTP requests to the backend API, ensuring a modular and maintainable codebase.
- **Environment Variables**: Configuration values such as API endpoints are managed through environment variables, allowing easy adaptation across different environments (development, production, etc.).
- **Error Handling**: The frontend includes proper error handling to provide users with meaningful feedback in case of issues during file upload or chart generation.

### Tools
- **Swagger**: Integrated for API documentation.

## Project Structure

The solution adheres to clean architecture principles, with a clear separation of responsibilities across different projects and layers:

- **API Project**: Contains the controllers that manage HTTP requests.
- **Service Project**: Houses the business logic and file processing strategies.

## File Processing Workflow

The system processes uploaded CSV/Excel files through the following steps:

1. **File Upload**: Users upload files through the Angular frontend, which sends them to a .NET Core API endpoint.
2. **File Type Identification**: The API determines the file type (CSV, Excel) based on its extension.
3. **File Processing**: The appropriate strategy is selected to process the file and convert its content into JSON.
4. **JSON Response**: The processed data is returned as JSON to the Angular frontend, where it is visualized using NGX-ECharts.

## Design Patterns and Principles

- **Strategy Pattern**: 
  - The `FileProcessor` utilizes the strategy pattern to delegate file processing to the appropriate strategy (e.g., `CsvFileProcessorStrategy`, `ExcelFileProcessorStrategy`).

- **Separation of Concerns**: 
  - The system is organized into distinct classes and layers:
    - **Controller Layer**: Handles HTTP requests.
    - **Service Layer**: Contains business logic and processing strategies.
    - **Repository Layer**: Manages the reading of CSV/Excel/txt files.

- **Dependency Injection**: 
  - Services and strategies are injected into the controller and service classes to promote loose coupling and facilitate easier testing.

## Frontend Implementation

The Angular frontend is designed with modularity and flexibility in mind:

- **Dynamic Data Visualization**: Leveraging **NGX-ECharts**, the frontend allows users to dynamically change the title of the chart, adjust the axis labels, and include or exclude headers for the chart. This flexibility ensures that users can customize the data presentation to meet their specific needs.
- **File Upload**: The application enables users to upload CSV/Excel files directly to the backend API. The JSON response from the API is then used to generate dynamic charts.
- **HTTP Services**: Separate Angular services are created for handling HTTP requests, ensuring that the code is modular and maintainable.
- **Environment Variables**: Configuration values, such as API endpoints, are managed through environment variables, allowing for easy configuration across different environments.
- **Chart Download Options**: Users can download the generated charts in various formats, including image, PDF, and PowerPoint (PPT), providing flexibility in how the data is shared and presented.
- **Error Handling**: The frontend includes error handling mechanisms that display meaningful feedback to users in case of issues during file upload or chart generation.

### Key Features
- **File Upload**: The Angular application allows users to upload CSV/Excel files.
- **Chart Customization**: Users can dynamically change chart titles, adjust axis labels, and control the inclusion of headers in the charts using NGX-ECharts.
- **Chart Generation**: The application generates visual charts based on the JSON data returned by the API.
- **Chart Download Options**: Users can download the charts in image, PDF, or PPT formats.

## API Documentation

Swagger is integrated with the .NET Core API for easy documentation and testing of the endpoints.

- **Swagger UI**: Accessible at `/swagger/index.html`, providing a user-friendly interface for interacting with the API.

## Error and Exception Handling

The system is designed with robust error and exception handling mechanisms:

- **Backend**: The .NET Core API implements comprehensive error and exception handling to manage various failure scenarios, ensuring that meaningful error messages are returned to the frontend.
- **Frontend**: Angular handles errors gracefully, providing users with clear and informative feedback in case of issues during file upload or chart generation.

## How to Run the Application

### Prerequisites

Ensure that you have the following installed on your system:

- **.NET Core SDK**: [Download .NET Core SDK](https://dotnet.microsoft.com/download) - Required to build and run the backend API.
- **Node.js and npm**: [Download Node.js](https://nodejs.org/) - Required to build and run the Angular frontend.
- **Angular CLI**: Install globally using `npm install -g @angular/cli` - Required to serve the Angular application.

### Running the Backend (ASP.NET Core API)

1. **Navigate to the API Project Directory**: 
   - Open a terminal and navigate to the root directory of the API project.

2. **Restore NuGet Packages**: 
   - Run `dotnet restore` to install all the necessary packages.

3. **Build the Project**: 
   - Run `dotnet build` to build the project.

4. **Run the API**: 
   - Run `dotnet run` to start the API server. By default, the API will be accessible at `https://localhost:7282`.

5. **Swagger UI**: 
   - Open a browser and navigate to `https://localhost:7282/swagger/index.html` to access the Swagger UI and interact with the API.

### Running the Frontend (Angular Application)

1. **Navigate to the Angular Project Directory**:
   - Open a terminal and navigate to the root directory of the Angular project.

2. **Install Dependencies**:
   - Run `npm install` to install all required npm packages.

3. **Serve the Angular Application**:
   - Run `ng serve` to start the Angular development server. The application will be accessible at `http://localhost:4200`.

### Environment Configuration

- **API URL**: The base URL for the API can be configured in the Angular project using the `environment.ts` file. This allows the application to easily switch between development and production environments.

