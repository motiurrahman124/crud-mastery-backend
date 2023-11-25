## Crud Mastery Backend

#### Instruction to run the application locally:

- **Clone the application in your pc:**

  Firstly go to a folder where you want to run the application, then open your terminal. Now copy the text below and paste your terminal, then press enter button.

  ```bash
  git clone https://github.com/motiurrahman124/crud-mastery-backend.git
  ```

- **Package install:**

  After successfully clone the application, write a command below:

  ```bash
  cd your-project-name
  ```

  And also run a command:

  ```bash
  npm install
  ```

- **Environment variable setup:**

  Open your application in code editor, like visual studio code and create a file in root directory with name **.env** , then edit the file according to the instruction given below:

  ```bash
  NODE_ENV = development
  PORT = 5000
  DATABASE_URL = write your database url from mongodb
  BCRYPT_SALT_ROUNDS = 12
  ````

- **Finally run your application:**

  After edit the .env file, run a command in the terminal given below.  

  ```bash
  npm run dev
  ```

  Now go to a web browser and go to this link - http://localhost:5000/. You can see a response -

  ```bash
  {
   "success": true,
   "message": "Welcome to crud mastery backend server!"
  }
  ```
  Finally your application has successfully run.


