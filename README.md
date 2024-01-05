## Medication Reviews/Side-Effects application:
The application helps users to review and report medication side effects.
1. Users signup and signin before they can use the application.
2. Users may add medications. The medication owner may update or delete their medication.
3. Users browse medications by the first letter [check example](https://www.drugs.com/drug_information.html).
4. Display full alphabet letters, when a letter is clicked all medications starting with the letter are fetched and displayed.
5. Users may submit a new review and read previously submitted reviews. Review owners may update or delete their reviews.
  
### Application specifications and requirements
Your project must use the following:  
* Implement a login-based system with JWT.  
* Browsing and reading reviews is open to guests, but adding, updating, and deleting functionality is restricted to users.
* State properties in all components and services should be declared as signals.
* Use at least one featured lazy-loaded module.
* Projects must have proper UI that complies with the web standards.

```typescript
User = { _id: string, fullname: string, email: string, password: string }
Image = { filename: string, originalname: string }
Review = { review: string, rating: number, by: { user_id: string, fullname: string }, date: number }
Owner = { user_id: string, fullname: string, email: string }
Medication = {
    name: string,
    first_letter: string,
    generic_name: string,
    medication_class: string,
    availability: string,
    image: Image,
    added_by: Owner,
    reviews: Review[]
}
// POST /users/signin
request_body = { "email": string, "password": string }
response_body = { "success": boolean, "data": string } // JWT token
// POST /users/signup
request_body = { "fullname": string, "email": string, "password": string }
response_body = { "success": boolean, "data": User }

// POST /medications
request_body = { "name": string, "generic_name": string, "medication_class": string, "availability": string }
request_multipart = "medication_image"
response_body = { "success": boolean, "data": Medication }

// GET /medications?first_letter=A
response_body = { "success": boolean, "data": Medication[] } // only name

// PUT /medications/:medication_id
request_body = { "name": string, "generic_name": string, "medication_class": string, "availability": string }
request_multipart = "medication_image"
response_body = { "success": boolean, "data": boolean }

// GET /medications/:medication_id
response_body = { "success": boolean, "data": Medication } // without reviews

// DELETE /medications/:medication_id
response_body = { "success": boolean, "data": boolean }

// POST /medications/:medication_id/reviews
request_body = { "review": string, "rating": string }
response_body = { "success": boolean, "data": string } // review_id

// GET /medications/:medication_id/reviews
response_body = { "success": boolean, "data": Review[] } // only name

// PUT /medications/:medication_id/reviews/:review_id
request_body = { "review": string, "rating": string }
response_body = { "success": boolean, "data": boolean }

// GET /medications/:medication_id/reviews/:review_id
response_body = { "success": boolean, "data": Review }

// DELETE /medications/:medication_id/reviews/:review_id
response_body = { "success": boolean, "data": boolean }

// GET /medications/images/:image_id
response_body = Binary of image file
```
