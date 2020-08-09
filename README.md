# Deployment instructions

navigate to client/ and run 
```
npm install
```

After deploying the correct smart contract addresses, edit client/src/deployedAddresses.json with the correct contract addresses. Although only a Kovan section exists, you can add a section for any other test network.

To run the app, 

```
npm start
```


Finally to create a static site which can be hosted from your favourite static site host such as S3,

```
npm build
```