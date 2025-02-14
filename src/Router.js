import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen, RegisterScreen,PostScreen, CategoriesScreen,CategoryScreen,MoreScreen,SavedPostsScreen, LoginScreen}  from './screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainProvider from './context/MainProvider';
import colors from './styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch , useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BlogStack = () => {
    const dispatch = useDispatch();
    async function checkLogin(){
        const localLogin = await AsyncStorage.getItem('@USER');
        if ( localLogin ) {
            dispatch({ type: 'SET_USER', payload: { user: JSON.parse(localLogin) } });
        }
    }
    
    useEffect(() => {
        checkLogin();
    }, []);
    return (
        <Stack.Navigator  screenOptions={{ header: () => null }}>
            <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
            <Stack.Screen name="Category" options={{title: ''}} component={CategoryScreen} />
            <Stack.Screen name="Post" options={{title: ''}} component={PostScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
};

const CategoiesStack = () => {
    return (
        <Stack.Navigator  screenOptions={{ header: () => null }}>
            <Stack.Screen name="Categories" options={{title: 'Kategoriler'}} component={CategoriesScreen} />
            <Stack.Screen name="Category" options={{title: ''}} component={CategoryScreen} />
            <Stack.Screen name="Post" options={{title: ''}} component={PostScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
};



const MoreStack = () =>{
    const user = useSelector((state) => state.user);
    return(
        <Stack.Navigator  screenOptions={{ header: () => null }}>
            <Stack.Screen name="More" component={MoreScreen} />
            
            {!user ?  <Stack.Screen name="Register" component={RegisterScreen} />: null}
            
            {!user ?  <Stack.Screen name="Login" component={LoginScreen} />: null}
            

        </Stack.Navigator>
    );
};



const SavedStack = () => {
    return (
        <Stack.Navigator  screenOptions={{ header: () => null }}>
            <Stack.Screen name="SavedPost" component={SavedPostsScreen} />
            <Stack.Screen name="Category" options={{title: ''}} component={CategoryScreen} />
            <Stack.Screen name="Post" options={{title: ''}} component={PostScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
};
const Router = () => {
    return (
        <MainProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color }) =>
                        generateIcon(focused, color, route)
                    })}
                    tabBarOptions={{
                        activeTintColor: colors.dark,
                        inactiveTintColor: '#aaa',
                    }}>
                    <Tab.Screen options={{ title: 'Haberler' }} name="BlogStack" component={BlogStack} />
                    <Tab.Screen options={{ title: 'Kategoriler' }} name="Categories" component={CategoiesStack} />
                    <Tab.Screen options={{ title: 'Kaydedilenler' }} name="SavedStack" component={SavedStack} />
                    <Tab.Screen options={{ title: 'Daha Fazla' }} name="MoreStack" component={MoreStack} />
                </Tab.Navigator>
            </NavigationContainer>
        </MainProvider>
    );
};

export default Router;


function generateIcon(focused, color, route) {
    let iconName;

    switch (route.name) {
        case 'BlogStack':
            iconName = focused ? 'newspaper-variant-multiple' : 'newspaper-variant-multiple-outline';
            break;
        case 'Categories':
            iconName = focused ? 'folder-multiple' : 'folder-multiple-outline';
            break;
            case 'SavedStack':
                iconName = focused ? 'bookmark-multiple' : 'bookmark-multiple-outline';
                break;
        case 'MoreStack':
            iconName = focused ? 'menu' : 'menu';
        break;
        

        default:
            break;
    }
    return <Icon name={iconName} color={color} size={30} />;
}