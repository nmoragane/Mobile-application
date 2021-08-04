import React, {useEffect, useReducer} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthStackNavigator from "./navigators/AuthStackNavigator";
import MainStackNavigator from "./navigators/StackNavigator";
import {createStackNavigator} from "@react-navigation/stack";
import AuthContext from "./context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Provider as PaperProvider} from "react-native-paper";
import {StoreProvider, useStore} from "./context/StoreProvider";
import {storeReducer, storeState} from "./reducers/storeReducer";
import {loginReducer, initialLoginState} from "./reducers/loginReducer";

const RootStack = createStackNavigator();

const App = () => {
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async token => {
        if (token) {
          try {
            await AsyncStorage.setItem("userToken", token);
          } catch (e) {
            console.log(e);
          }
        }
        dispatch({type: "LOGIN", token});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (e) {
          console.log(e);
        }
        dispatch({type: "LOGOUT"});
      },
    }),
    [],
  );

  useEffect(async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
    } catch (e) {
      console.log(e);
    }
    dispatch({type: "RETRIEVE_TOKEN", token: userToken});
  }, []);

  return (
    <PaperProvider>
      <AuthContext.Provider value={{authContext}}>
        <StoreProvider reducer={storeReducer} initialState={storeState}>
          <NavigationContainer>
            {loginState.userToken ? (
              <RootStack.Navigator headerMode="none">
                <RootStack.Screen name="MainStackNavigator" component={MainStackNavigator} />
              </RootStack.Navigator>
            ) : (
              <RootStack.Navigator headerMode="none">
                <RootStack.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
              </RootStack.Navigator>
            )}
          </NavigationContainer>
        </StoreProvider>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
