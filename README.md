# JSON Path Finder

A React component for finding and extracting data from JSON objects using JSON path expressions. This tool allows users to easily navigate complex JSON structures and extract specific values.

## Features

- Extract data from JSON using path expressions
- Support for nested objects and arrays
- Real-time validation and error handling
- Copy results to clipboard
- Client-side processing (no data is sent to any server)

## Installation

```bash
npm install
npm start
```

## Usage

The application will be available at http://localhost:3000

## JSON Path Syntax

This tool supports a simplified JSON path syntax:

- Use dot notation to access object properties: `user.name`
- Use bracket notation with indices to access array elements: `users[0]`
- Combine both notations for nested structures: `users[0].address.city`
- Optionally use `$` to reference the root object: `$.users[0].name`

## How it Works

This tool parses the provided JSON path and traverses the JSON object to find the specified value. All processing happens in the browser - no data is sent to any server.

## License

MIT
