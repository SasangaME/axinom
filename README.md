# Build Steps

## Sender Service

1. `cd receiver`
2. Change MONGO_DB_URL in the .env file
3. `npm run build`
4. `docker build . -t receiver-service`
5. `docker run -p 4002:4002 receiver-service`

## Receiver Service

1. `cd receiver`
2. `npm run build`
3. `docker build . -t sender-service`
4. `docker run -p 4001:4001 sender-service`

## UI

1. `cd client`
2. `npm install`
3. `npm start`

# Work Flow

1. Create a system user - sample API request: receiver/api-requests/content.rest <br />
   POST http://localhost:4002/api/v1/auth/user

2. Obtain JWT token by using the above .rest file <br />
   POST  http://localhost:4002/api/v1/auth/login

3. Upload the file using below endpoint <br />
   POST http://localhost:4001/api/v1/file <br />
   Add `Authorization: Bearer ${jwt}` replace with the JWT token obtained in the previous step <br />
   Attach a .zip file as Form-data <br />
   Key: file <br />
   Value: ${attached_file} <br />

4. JSON submissions can be found in <br />
   GET http://localhost:4002/api/v1/content  <br />
   GET http://localhost:4002/api/v1/content/${id} : replace id with the content id

5. JSON submissions can be also found in the UI home page
