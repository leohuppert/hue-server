# Hue server

## Outdated way of getting key and ip

> First get your Hue bridge IP address : https://discovery.meethue.com/

> Then get a user token to interact with the bridge API, execute this POST request with your name and bridge IP :

```
curl -X POST -d {\"devicetype\":\"my_hue_app#<NAME>\"} <BRIDGE_IP>/api
```

> Press the link button on the bridge and execute it again. Keep the token you were sent back.

## env file

Create a `.env` file at the project root and set these variables

```
HUE_BRIDGE_API=<the bridge ip>
HUE_APPLICATION_KEY=<your application key>
```

You can start the API !

```
npm i
npm run dev
```
