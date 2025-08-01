### 📄 `category-api-docs.md`

````markdown
# 📁 Category API Documentation

Base URL: `/api/categories`

---

## 🔹 GET `/api/categories`

**Description**: Retrieve all categories.

**Responses**:

- `200 OK`: Returns a list of all categories.

**Example Response**:

```json
[
  {
    "id": 1,
    "name": "Historical Tours"
  },
  {
    "id": 2,
    "name": "Nature Walks"
  }
]
```
````

---

## 🔹 GET `/api/categories/{id}`

**Description**: Retrieve a category by its ID.

**Path Parameters**:

- `id` (integer) – Category ID.

**Responses**:

- `200 OK`: Returns the category object.
- `404 Not Found`: If no category is found with the given ID.

**Example Response**:

```json
{
  "id": 1,
  "name": "Historical Tours"
}
```

---

## 🔹 POST `/api/categories`

**Description**: Create a new category.

**Request Body**:

```json
{
  "name": "Adventure"
}
```

**Responses**:

- `200 OK`: Returns the created category object.

**Example Response**:

```json
{
  "id": 3,
  "name": "Adventure"
}
```
