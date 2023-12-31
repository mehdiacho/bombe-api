# Bombe Med API

**Version:** 1.0.0  
**OpenAPI Specification:** OAS 3.1

Medical Inventory Management Express API

**Servers**
- Development: [http://localhost:8383](http://localhost:8383)

## Overview

Bombe Med API is a comprehensive API for medical inventory management. It provides functionality for managing medicine inventory, user accounts, and facilitates medicine procurement. The API is well-documented using the OpenAPI Specification (OAS) 3.1.

## Table of Contents

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before using the  API, ensure you have the following prerequisites:

- Node.js and NPM
- Firebase Account and API Key

### Installation

To set up the API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/mehdiacho/bombe-api.git
   ```

2. Navigate to the project folder:

   ```bash
   cd bombe-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure API settings, such as environment variables and Firebase credentials.

## Usage

### Endpoints

The Medicine Procurement API offers the following endpoints:

- **Create User**: Create a new user account for medicine procurement.
    - HTTP Method: POST
    - Path: `/users/create-account`
    - Parameters:
        - `username`: The username of the user.
        - `email`: The email address of the user.
        - `password`: The user's password.
    - Request Example:
      ```json
      {
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123"
      }
      ```
    - Response Example:
      ```json
      "User account created successfully"
      ```

- **Sign In User**: Authenticate and sign in as a user.
    - HTTP Method: POST
    - Path: `/users/sign-in`
    - Parameters:
        - `email`: The user's email address.
        - `password`: The user's password.
    - Request Example:
      ```json
      {
        "email": "john@example.com",
        "password": "password123"
      }
      ```
    - Response Example:
      ```json
      "User authenticated and signed in successfully"
      ```

- **Load Prescription**: Allows users to upload a prescription.
    - HTTP Method: POST
    - Path: `/users/load-prescription`
    - Parameters:
        - `userId`: The user's ID.
        - `prescription`: The prescription details or image.
    - Request Example:
      ```json
      {
        "userId": "user123",
        "prescription": "Prescription details..."
      }
      ```
    - Response Example:
      ```json
      "Prescription uploaded successfully"
      ```

- **Retrieve Prescription**: Retrieves a user's stored prescription.
    - HTTP Method: GET
    - Path: `/users/retrieve-prescription`
    - Parameters:
        - `userId`: The user's ID.
    - Request Example:
      `/users/retrieve-prescription?userId=user123`
    - Response Example:
      ```json
      "Prescription details..."
      ```

- **Search Medicine**: Search for medicine-providing facilities by medicine and location.
    - HTTP Method: GET
    - Path: `/facilities/search-medicine`
    - Parameters:
        - `medicine`: The name of the required medicine.
        - `location`: The location for searching facilities.
    - Request Example:
      `/facilities/search-medicine?medicine=paracetamol&location=Gaborone`
    - Response Example:
      ```json
      [
        {
          "facilityName": "Medical Clinic",
          "location": "Gaborone",
          "medicines": ["paracetamol", "ibuprofen"]
        },
        {
          "facilityName": "Pharmacy Express",
          "location": "Gaborone",
          "medicines": ["paracetamol", "aspirin"]
        }
      ]
      ```


### Inventory

#### Get a list of all inventory

- **HTTP Method:** GET
- **Path:** `/inventory`
- **Description:** Retrieve a list of all items in the inventory.

#### Get a list of medicines in the inventory

- **HTTP Method:** GET
- **Path:** `/medicines`
- **Description:** Get a list of all medicines available in the inventory.

#### Get a list of all tags in the inventory

- **HTTP Method:** GET
- **Path:** `/tags`
- **Description:** Retrieve a list of all tags associated with items in the inventory.

#### Get medicine information by name

- **HTTP Method:** GET
- **Path:** `/medicines/{name}`
- **Description:** Get detailed information about a specific medicine by its name.

#### Get list of inventory by tag name

- **HTTP Method:** GET
- **Path:** `/tags/{name}`
- **Description:** Retrieve a list of inventory items associated with a specific tag.

#### Add a new batch of medicine to the inventory

- **HTTP Method:** POST
- **Path:** `/add-batch`
- **Description:** Add a new batch of medicine to the inventory.

#### Add a new medicine to the inventory

- **HTTP Method:** POST
- **Path:** `/add-medicine`
- **Description:** Add a new medicine to the inventory.

#### Update batch information selectively

- **HTTP Method:** PATCH
- **Path:** `/update-batch`
- **Description:** Update specific information of a batch in the inventory.

#### Update medicine information selectively

- **HTTP Method:** PATCH
- **Path:** `/update-medicine`
- **Description:** Update specific information of a medicine in the inventory.

#### Delete a batch by id

- **HTTP Method:** DELETE
- **Path:** `/delete-batch`
- **Description:** Delete a batch from the inventory using its ID.

#### Delete a medicine by id

- **HTTP Method:** DELETE
- **Path:** `/delete-medicine`
- **Description:** Delete a medicine from the inventory using its ID.

### Accounts

#### Create a new medicine-providing facility account

- **HTTP Method:** POST
- **Path:** `/facilities/create-account`
- **Description:** Register a new medicine-providing facility account.

#### Add an employee to a specific medicine-providing facility

- **HTTP Method:** POST
- **Path:** `/facilities/add-employee`
- **Description:** Add an employee to a specific medicine-providing facility.

#### Create a new user account for medicine procurement

- **HTTP Method:** POST
- **Path:** `/create-user`
- **Description:** Create a new user account for medicine procurement.

#### Authenticate and sign in as a user

- **HTTP Method:** POST
- **Path:** `/users/sign-in`
- **Description:** Authenticate and sign in as a user.

#### Get the user's userID by email address

- **HTTP Method:** GET
- **Path:** `/users/get-user-id`
- **Description:** Retrieve the user's userID based on their email address.

### Medicine Procurement

#### Allows users to upload a prescription

- **HTTP Method:** POST
- **Path:** `/users/load-prescription`
- **Description:** Allow users to upload a prescription.

#### Retrieves a user's stored prescription

- **HTTP Method:** GET
- **Path:** `/users/retrieve-prescription`
- **Description:** Retrieve a user's stored prescription.

#### Search for medicine-providing facilities by medicine and location

- **HTTP Method:** GET
- **Path:** `/facilities/search-medicine`
- **Description:** Search for medicine-providing facilities by a specific medicine and location.

#### Place an order for medicine at a specific facility

- **HTTP Method:** POST
- **Path:** `/orders/place-order`
- **Description:** Place an order for medicine at a specific facility.

### Authentication

Authentication is required for certain endpoints. Users can sign up and sign in using their email and password.

## Error Handling

- The API returns appropriate error codes and messages for different error scenarios. Refer to the API documentation for a list of possible error codes and their meanings.

## Documentation

- Swagger, an open-source tool, is used for documenting this API. You can access the documentation at [API Documentation](http://localhost

:8383/api-docs).

## Contributing

If you'd like to contribute to this project, please follow the guidelines in the [CONTRIBUTING](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides an overview of the Medicine Procurement API, its endpoints, and how to use it. Customize it to fit your specific API and provide as much information as necessary for users to understand and use your API effectively.