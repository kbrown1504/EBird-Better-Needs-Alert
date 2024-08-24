This project uses the eBird API 2.0. In order to access this API, and API key is required.

The applciation uses this key via an environment file. You can create your own environment file/s at src/environments/environment.ts and src/environment/environment.prod.ts

The contents of those files need to be the following

export const environment {

  production: true/false
  
  ebirdKey: {{API KEY}}

}

Project can be run after 

npm i

ionic serve
