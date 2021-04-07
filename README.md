<h1>Work Hours</h1>

<p>This is a web app where you can track your work hours across different projects and departments.</p>
<p>The app is made on the Vue.js framework (Nuxt) in the frontend, and node.js with Express and Mongodb in the backend.</p>
<p>To test the app, you can try it here: (TODO: ADD LINK) (NB: The web app will only for testing and will delete all data put into it regularly)</p>

<h2>Frontend</h2>
<p>The frontend is set up as a SPA using the Nuxt.js framework on top of Vue.js. To ease development the UI framework Vuetify is also used (Material UI for Vue). In development mode the app uses the build in development mode of Nuxt so that it adds changes to localhost in realtime as you develop. </p>

<h2>Backend</h2>
<p>The backend is set up in Node.js with Express and Mongoose (to interact with the DB). The database used is MongoDB. In development mode the app uses nodemon to run the backend so that it reloads the app in real time as you make changes.  </p>
  
<h2>Development</h2>
<p>The app is set up in docker containers (frontend, backend and DB). This means that all you have to do to test the app on your local machine, or develop more from it is to download the files and run "docker-compose up". You can then access the frontend on "localhost:3000" and the backend on "localhost:3001"</p>
