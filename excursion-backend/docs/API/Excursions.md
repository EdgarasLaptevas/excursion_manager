### 📄 `excursion-api-docs.md`

````markdown
# 📁 Excursion API Documentation

Base URL: `/api/excursions`

---

## 🔹 GET `/api/excursions`

**Description**: Retrieve all excursions.

**Responses**:

- `200 OK`: Returns a list of all excursions.

**Example Response**:

```json
[
  {
    "id": 3,
    "title": "Vilnius Old Town Walking Tour",
    "photo_url": "https://example.com/images/vilnius-tour.jpg",
    "duration": "2h 30min",
    "price": 15.99,
    "categoryName": "First category",
    "datesList": []
  },
  {
    "id": 8,
    "title": "Vilnius Old Town Walking Tour",
    "photo_url": "https://example.com/images/vilnius-tour.jpg",
    "duration": "2h 30min",
    "price": 15.99,
    "categoryName": "First category",
    "datesList": [
      {
        "excursionTime": "2025-08-10T13:00:00"
      },
      {
        "excursionTime": "2025-08-12T17:00:00"
      }
    ]
  }
]
```
````

---

## 🔹 GET `/api/excursions/{id}`

**Description**: Retrieve a specific excursion by ID.

**Path Parameters**:

- `id` (integer) – Excursion ID.

**Responses**:

- `200 OK`: Returns the excursion object.
- `404 Not Found`: If no excursion is found with the given ID.

---

## 🔹 POST `/api/excursions`

**Description**: Create a new excursion.

**Validations**:

- `title` must not be null or blank.
- `category.id` must refer to an existing category.

**Request Body**:

```json
{
  "title": "Vilnius Old Town Walking Tour",
  "photo_url": "http://example.com/trakai.jpg",
  "duration": "2h 30min",
  "price": 15.99,
  "category": {
    "id": 1
  },
  "datesList": [
    {
      "excursionTime": "2025-08-10T10:00:00"
    },
    {
      "excursionTime": "2025-08-12T14:00:00"
    }
  ]
}
```

**Responses**:

- `200 OK`: Excursion created successfully.
- `400 Bad Request`: Validation failure (e.g., missing title or invalid category ID).

**Example Error Responses**:

```json
{
  "error": "Title is required"
}
```

```json
{
  "error": "Category with ID 99 does not exist."
}
```
