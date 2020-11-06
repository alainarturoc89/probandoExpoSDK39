/*
const commonModules = {
    Help: HelpScreen,
    NotFound: NotFoundScreen
  };
  
  const outsideModules = {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  };
  
  const insideModules = {
    Home: HomeScreen,
    Profile: ProfileScreen,
  };
  
  // Then use them in your components by looping over the object and creating screen configs
  // You could extract this logic to a utility function and reuse it to simplify your code
  <Stack.Navigator>
    {Object.entries({
      // Use the screens normally
      ...commonModules,
      // Use some screens conditionally based on some condition
      ...(isLoggedIn ? insideModules : outsideModules),
    }).map(([name, component]) => (
      <Stack.Screen name={name} component={component} />
    ))}
  </Stack.Navigator>;
*/

export default {}