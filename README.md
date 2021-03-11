# Registry Viewer

This is a simple web page that displays the information found in the "Registry Contract".
The application uses [in3](https://in3.readthedocs.io/en/develop/api-ts.html) client.<br> to connect to the blockchain.

## Preriquisites

- Nodejs v15.5.1 or higher
- React v17.0.1
- Typescript 4.1.3.x or higher

### Installation

make sure that internal project modules are installed by typing:

    npm install

### How to run

    npm start
will run the project in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Note: in3 client is only working on Chrome browser. So, for the sake of the test, please run Chrome.

### How to test

after installation of internal project modules (npm install) <br>
run the following command:

    npm test

It will start running three tests:<br>
    1. the render process<br>
    2. connectivity to the network<br>
    3. fetching addresses
    4. fetching of nodes info<br>
    5. fetching of signers

### How to build

if you want a production build that works with any static file server, simply invoke the command: <br>

    npm run build
<br>
