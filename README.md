# VGManager Frontend

VGManager Frontend is a React application designed to simplify and automate various operations in Azure DevOps. It works in conjunction with the VGManager backend to facilitate variable group changes in Azure DevOps Libraries and secret changes in Azure KeyVault.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Azure DevOps is a powerful platform for managing software development projects, but some tasks, such as modifying variable groups and secrets, can be time-consuming. VGManager Frontend streamlines these processes by providing a user-friendly interface for making these changes. It communicates with the VGManager backend to perform the necessary actions securely and efficiently.

## Features

VGManager Frontend offers the following key features:

- **Variable Group Management**: Easily create, update, and delete variable groups within Azure DevOps Libraries.
- **Secret Management**: Efficiently manage secrets in Azure KeyVault, including creating, updating, and deleting secrets.
- **User-friendly Interface**: A clean and intuitive web-based interface that simplifies complex operations.
- **Security**: Ensures the security of your Azure DevOps and Azure KeyVault resources through secure communication with the VGManager backend.
- **Audit Trails**: Keeps a record of all changes made through the application for auditing and compliance purposes.

## Prerequisites

Before getting started with VGManager Frontend, ensure you have the following prerequisites in place:

- **VGManager Backend**: Make sure the VGManager backend is set up and running. You will need its URL to configure the frontend.
- **Azure DevOps Account**: Access to an Azure DevOps account with appropriate permissions to manage variable groups.
- **Azure KeyVault**: An Azure KeyVault instance where you want to manage secrets.

## Getting Started

To get started with VGManager Frontend, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies using:

   ```shell
   npm install
   ```

3. **Configuration**: Configure the application by creating a `.env` file in the project root directory. Set the following environment variables:

   ```dotenv
   REACT_APP_BACKEND_BASE_URL=<BASE_URL>
   REACT_APP_BACKEND_PORT_NUM=<PORT>
   ```

4. **Start the Application**: Run the application locally using:

   ```shell
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

## Usage

Once VGManager Frontend is up and running, you can use it to automate operations in Azure DevOps and Azure KeyVault. Follow the intuitive interface to perform variable group and secret management tasks. Detailed usage instructions and guides can be found in the application's documentation.

## Contributing

We welcome contributions from the community! If you'd like to contribute to VGManager Frontend, please follow our [Contribution Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it in accordance with the terms of the license.