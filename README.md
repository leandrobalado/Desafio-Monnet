# DESAFIO MONNET - Automation Repo

## Getting Started

This project requires the following:

- Tests are written in `TypeScript`.
- This framework utilizes `PlayWright` for test execution.
- IDE: The one of your preference.

## Installation:

1. Clone this repository:

```bash
    git clone https://github.com/leandrobalado/Desafio-Monnet
```

2. Install dependencies:

Using `npm` package manager:

```bash
    npm install
```

## Project Structure

- `/tests/api-tests`: Contains specs files to run API testing for each part of the challenge.
- `/tests/ui-tests`: Contains specs file to run UI (Front-end) tests of the challenge.
- `/tests/pages`: Contains file to handle POM.
- `/tests/test-data`: Contains `.xlsx` file to read test cases.
- `/tests/fixtures`: Contains file to handle the fixture to log key-value for specidied test requested in the challenge file.
- `/playwright.config.ts`: File which contains all PlayWright configurations.

## Secret Key

We have to log the secret key before running some tests. In order to do that, you have to create a `.env` file in the root folder and complete the key-value so the fixture will consume it.

- It has this format:
  ```bash
  SHA256="*paste-your-value-here*"
  ```

> [!NOTE]
> Notice that `.env` file is added in `.gitignore` in order to prevent shearing secret key-values in a public repository. The secret value is provided in the `Challenge QA Engineer SSR - Monnet Payments.pdf` file, copy paste from there.

## Running Tests

To run all tests, run this command in your terminal:
```bash
npm run test
```
The API tests has two parts.
To run all the API tests, run this command in your terminal:
```bash
npm run test:api
```
To run Part-1 of the API tests, run this command in your terminal:
```bash
npm run test:api-part-1
```
To run Part-2 of the API tests, run this command in your terminal:
```bash
npm run test:api-part-2
```

To run the Web Test, run this command in your terminal:
```bash
npm run test:web
```

To show the report of the test execution, run this command in your terminal:
```bash
npm run test:report
```