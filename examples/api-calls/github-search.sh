#!/bin/bash
# Example: Search Examplefor c Search ses

cPOl -X POST http://localhost:5678/webhook/github-search \
  -H "Content-Type: application/json" \
  -d '{
    "technology": "Python",
    "seniority": "Senior",
    "location": "Brazil",
    "min_score": 85
  }'
