/* eslint-disable react/react-in-jsx-scope */
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

// region Splash Screen
const Splash = ({ navigation }: any) => {
    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/images/post3.jpg')}
        >
            {/* <StatusBar style="light" /> */}
            <View style={styles.header} />

            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.title}>Stay connected with everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.textSign}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </ImageBackground>
    );
};

// Styling Part..
// region Styling Part
const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'royalblue',
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        fontSize: 30,
        color: '#05375a',
        fontWeight: 'bold',
    },
    text: {
        color: 'gray',
        marginTop: 5,
    },
    button: {
        alignItems: 'flex-end',
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        backgroundColor: 'royalblue',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Splash;
