## How to setup the environment

* Read [Official React Native documentation](https://reactnative.dev/docs/environment-setup) and make sure you have installed all the required dependencies before starting on devlopment on the project.

1. Clone the repo

2. Create a file named **.env** on root direcotory.

3. Update the **.env** file with below info according to your workspace.
``` 
  HOST=192.168.1.101
  PORT=3000
  PROTOCOL=https

  HOST_PORT=https://grovi-backend.herokuapp.com

  GOOGLE_API_KEY=MY_API_KEY_HERE

```

4. Create the following xml file.
```
  /android/app/src/main/res/values/api-keys.xml
```

5. Add this code and replace API key with your Google API key. [How to create Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
```
  <?xml version="1.0" encoding="utf-8"?>
  <resources>
      <string name="google_api_key">MY_API_KEY_HERE</string>    
  </resources>
```

6. Run these commands after adding your API key.
```
  sudo yarn insall
  sudo yarn react-native start --reset-cache
  sudo yarn react-native run-android
```
--------------------------------


Group No: 15
Member               | Index No | Github username
-------------------- | ---------| ---------------
J.P.A. Shanaka       | 18001582 | ashanaka
D.D. Liyanaarachch i | 18000932 | DDhanushka
A. H. Dodampe        | 18000462 | anjana-dodampe
A.C.Vidanagamachchi  | 18001769 | asinduvg
G. H. G. M. Madara   | 18020471 | ManulMax
