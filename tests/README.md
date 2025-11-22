# Tests

Unit, integration, and end-to-end tests (coming soon).

## Test Structure

```
tests/
├── unit/           # Unit tests for individual functions
├── integration/    # Integration tests for workflows
├── e2e/           # End-to-end tests
└── fixtures/      # Test data and mocks
```

## Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run specific test suite
npm test -- --grep "GitHub Search"

# Run with coverage
npm run test:coverage
```

## Test Guidelines

- Write tests before implementing features (TDD)
- Aim for >80% code coverage
- Use fictional data only
- Mock external API calls
