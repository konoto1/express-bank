# Bank API Express.js

![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)
[![Discord](https://discord.com/api/guilds/571393319201144843/widget.png)](https://discord.gg/dRwW4rw)

_Raeact.js project Bank_

<br>

## 🌟 About

This project is for educational purposes only.

Site published at: [here](https://github.com/konoto1/express-bank)

Design: --

## 🎯 Project features/goals

-   Create Bank API routes

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

Insomnia - download and install

```
https://insomnia.rest/download
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo
    ```sh
    git clone https://github.com/konoto1/express-bank.git
    ```
2. Open the cloned folder
3. Install NPM packages
    ```sh
    npm i
    ```
    or
    ```sh
    npm install
    ```
4. Run the server
    ```sh
    npm run dev
    ```
5. Follow the link

### 🧪 Running tests

There is no tests for this project.

## 🎅 Authors

Tomas: [Github](https://github.com/konoto1)

## ⚠️ License

Distributed under the MIT License. See LICENSE.txt for more information.

## 🔗 Other resources

No other resources.

## 📝Instructions

To create account:

> POST

```
/api/account
```

Data type to be used:

{
"nameSurname": "name-surname",
"DOB": "YYYY-MM-DD"
}

> GET:

```
/api/account/name-surname
```

-   Returns account owner name, surname and date of birth.

> DELETE:

```
/api/account/name-surname
```

-   Deletes account.

> PUT

```
/api/account/name-surname
```

Data type to be used:

{
"nameSurname": "name-surname",
"DOB": "YYYY-MM-DD"
}

Returns old and new information about account.

### /api/account/name

> GET

```
/api/account/name-surname/name
```

Returns account owner name.

> PUT

```
/api/account/name-surname/name
```

Changes account owner name.

Data type to be used:

{
"name": "name"
}

### /api/account/surname

> GET

```
/api/account/name-surname/surname
```

Returns account owner surname.

> PUT

```
/api/account/name-surname/surname
```

Changes account owner surname.

Data type to be used:

{
"surname": "surname"
}

### /api/account/dob

> GET

```
/api/account/name-surname/dob
```

Returns account owner date of birth.

> PUT

```
/api/account/name-surname/dob
```

Changes account owner date of birth.

Data type to be used:

{
"DOB": "YYYY-MM-DD"
}
