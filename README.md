# School In the Cloud Backend

https://documenter.getpostman.com/view/7148308/S1TN5frK?version=latest


## Server and Database

### To run locally:

Use yarn to install dependencies. (_**yarn start**_)

The default port is 5000.

## Contents

**Tables**
[Users](#Users) |
[Tasks](#Trips)

**Endpoints**
[Users](#users-1) |
[Tasks](#trips) |
[Profiles](#accounts) |

# Schemata

### Users

There are three kinds of users, 'student', 'volunteer' and admin. An admin has access to the full CRUD functionality for all tasks; a volunteer has read-only access, except for their own account information. Admin has access to all routes. All fields are required:

- Each user has a unique, auto-incremented id. This is done for you.

- A **_username_** has maximum length of 255 characters, and must be unique.

- **_Password_** also has maximum length of 255 characters.

- The user's **_name_** has a maximum length 255 characters.

- The user's **_role_** must be specified as either 'guide' or 'tourist'.

- The user's **_email_** can be up to 255 characters.

- The user's **_country_** can be up to 255 characters.

- A user **_phone_** is also required, having a maximum length of 128 characters.

_Example of a User row:_

| id  | username | password   | name            | role | email                | country      | phone        |
| --- | -------- | ---------- | --------------- | ---- | -------------------- | ------------ | -------------|
| 133 | dgarcia  | _password_ | Dietrich Garcia | user | dgarcia@fakemail.com | United States| 555-555-5555 |

---

### Tasks

The fields for tasks give the registered admins flexibility so they can tailor descriptions to suit their own needs. As with the users, all fields are required.

- Each has a unique id that auto-increments. This is done for you.

- The **_title_** has a maximum of 255 characters, and can be specified by the person creating the task.

- The **_description_** has a maximum of 255 characters, and can be specified by the person creating the task.

- The **_completed_** is a boolean and is set to false by default.

- The **_user_id_** is the id of the guide providing the experience/trip.

_Example of a Task Row:_

| id  |    title      |  description  | completed  |    user_id    |
| --- | ------------- | ------------- | ---------- |  ------------ |
| 3   |   Meeting     | Meeting at 2  |    false   |      1        |


[^Back to Top^](#school-in-the-cloud-backend)

# **App Endpoints**

## tasks

### /api/tasks

#### GET

A successful GET request gives HTTP code of 200 and returns an array with a list of all tasks as JSON objects.

#### POST

The request body must include all fields:

```javascript
{
	title:  "Meeting", //required
	description:  "Meeting with Mike at 3",
	taskcompleted:  "0",//set to false by defualt
    user_id: 1,//user_id of the assigned colunteer

},
```

Success: Returns a status of 201 and a JSON object with a success message. A user must be registered as an 'admin' to access this endpoint.

---

### /api/tasks/_{id}_

#### GET

A successful GET request to this endpoint returns a JSON object with the id specified and status 200. Admin and Volunteer roles may access this endpoint.

#### PUT

The request body must contain the information needed to update the trip object. A user must be an 'admin' to access this endpoint.

Success: Returns a status of 201 and a JSON object with a success message. 

#### DELETE

This permanently removes the task from the database. You may want to give the logged-in admin an opportunity to confirm before finalizing the request to this endpoint. A successful DELETE request to the endpoint returns a status 201 and a message that the task was deleted.

### /api/tasks/byVolunteer/_{id}_

### GET

This route takes the id of a volunteer and returns all tasks assinged to them.

---

[^Back to Top^]()


## Accounts

### /api/accounts/

#### GET

Brings up a list of all accounts, complete with passwords

### /api/accounts/:id

#### GET

Brings up the complete profile (i.e., including password) of the user with the specified id. Maybe useful for (for example) letting account holder change password.

### /api/accounts/student

#### GET

Brings up a list of all students, complete with their passwords

### /api/accounts/volunteer

#### GET

Brings up a list of all students, complete with their passwords

### /api/accounts/admin

#### GET

Brings up a list of all admin, complete with their passwords


### /api/accounts/(role)/:id

#### GET

Brings up a complete profile of the account with the specified id. Maybe useful for (for example) letting user change password.

### /api/accounts/register

#### POST

The username

```javascript
{
	username:  "",
	password:  "",
	name:  "",
	role:  "",
    email:  "",
    country: "",
	phone:  "",
}
```

Success: Returns a status of 201 and a JSON object with a success message and the id number, role and token of the new user.

---

### /api/accounts/login

#### POST

The request body must include a unique username and a password matching what is on the database. Returns a success message and a token which is required to pass to be able access restricted routes.

```javascript
{
	username:  "",
	password:  "",

}
```

Success: Returns a status of 201 and a JSON object with the token.

---

[^Back to Top^](#school-in-the-cloud-backend)

```