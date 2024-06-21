* First you need to install the following dependencies:
* express
* cors
* dotenv to access environment variables (like the MongoDB URI)
* mongoose
* typescript types for those
* * So you can use: npm install express cors dotenv mongoose @types/express @types/cors @types/mongoose
* Then you need to create a .env file in the root of your project and add the following:
* MONGODB_URI=your_mongo_uri (you can get this from MongoDB Atlas)
* Then you need to create a folder called src and add the following files inside SRC folder:
* app.ts where you need to start the express server with const app = express(); and export it
* Then you need to create a file called server.ts and create this function:
* app.listen(3005, () => console.log('Server is running on port 3005')) message that will be displayed in the console when the server is running;
* 3005 is the port where the server will run, you can change it to any other port you want;

* Then you need to create inside src a folder called config and create a file called database.ts and create the function that you can find on the database.ts
* When you start to create controllers you need to create the file index.ts inside the controllers folder and export all the controllers from there 
* so you can import them in the routes file when you have all the function read to fetch data. 

after that you need to go to the json file inside backend and change the script like as follow:
"scripts": {
    "start": "ts-node src/server.ts",
    "dev": "nodemon src/server.ts"
  },

  so once you run dev you can use nodemon which helps you to keep working your server and restart every time you make some changes, but if you make some changes
  on the .env file you need to restart the server

  Be sure to have all these dependencies on you json file
    "scripts": {
    "start": "ts-node src/server.ts",
    "dev": "nodemon src/server.ts"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongodb": "4.1",
    "mongoose": "^8.4.3",
    "ts-node": "^10.9.2"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/mongodb": "^4.0.7",
    "@types/mongoose": "^5.11.97",
    "@types/node": "^20.14.5",
    "nodemon": "^3.1.3",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5"
  }