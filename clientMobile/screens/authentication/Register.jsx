import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Platform,
    TextInput
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, OutlineButton } from '../../components/widgets/Button';

const Register = ({ navigation }) => {
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        profilePhoto: '',
        bio: '',
        title: '',
        email: '',
        password: '',
        retypePassword: '',
        birthDate: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const textInputChange = (value, type) => {
        // Email text on change..
        if (type === 'EMAIL') {
            if (value.length !== 0) {
                setData({
                    ...data,
                    email: value,
                    check_textInputChange: true
                });
            } else {
                setData({
                    ...data,
                    email: value,
                    check_textInputChange: false
                });
            }
        }
        // Password on change text..
        if (type === 'PASSWORD') {
            setData({
                ...data,
                password: value
            });
        }
    };

    // Secure Text Entry Updating Function..
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/images/post1.jpg')}
        >
            <StatusBar style="light" />

            {/* ---- Header ---- */}
            <View style={styles.header}>
                <Text style={styles.text_header}>Sign Up</Text>
            </View>

            {/* ---- Footer ---- */}
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                {/* ---- Email ---- */}
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={(value) => textInputChange(value, "EMAIL")}
                    />

                    <Animatable.View animation="bounceIn">
                        {data.check_textInputChange && <Feather name="check-circle" size={20} color="green" />}
                    </Animatable.View>
                </View>

                {/* ---- Password ---- */}
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(value) => textInputChange(value, "PASSWORD")}
                    />

                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? <Feather name="eye-off" size={20} color="grey" /> : <Feather name="eye" size={20} color="grey" />}
                    </TouchableOpacity>
                </View>

                {/* ---- Retype Password ---- */}
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Retype Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Again Type Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(value) => textInputChange(value, "PASSWORD")}
                    />

                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ? <Feather name="eye-off" size={20} color="grey" /> : <Feather name="eye" size={20} color="grey" />}
                    </TouchableOpacity>
                </View>

                {/* ---- Bio ---- */}
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Bio</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons name="bio" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={(value) => textInputChange(value, "EMAIL")}
                    />

                    <Animatable.View animation="bounceIn">
                        {data.check_textInputChange && <Feather name="check-circle" size={20} color="green" />}
                    </Animatable.View>
                </View>

                {/* ---- Title ---- */}
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Title</Text>
                <View style={styles.action}>
                    <MaterialCommunityIcons name="subtitles-outline" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Your Email"
                        style={styles.textInput}
                        onChangeText={(value) => textInputChange(value, "EMAIL")}
                    />

                    <Animatable.View animation="bounceIn">
                        {data.check_textInputChange && <Feather name="check-circle" size={20} color="green" />}
                    </Animatable.View>
                </View>

                {/* ---- Birth Date ---- */}
                <Text style={[styles.text_footer, { marginTop: 20 }]}>Birth Date</Text>
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Birth Date"
                        style={styles.textInput}
                        onChangeText={(value) => textInputChange(value, "EMAIL")}
                    />

                    <Animatable.View animation="bounceIn">
                        {data.check_textInputChange && <Feather name="check-circle" size={20} color="green" />}
                    </Animatable.View>
                </View>


                {/* ---- Buttons ---- */}
                <View style={{ marginTop: 30 }}>
                    <Button
                        title="Regsiter"
                        color1st="orange"
                        color2nd="red"
                        size={18}
                        textColor="white"
                        width="100%"
                        height={50}
                        onPress={() => navigation.navigate("UploadProfile")}
                    />

                    <View style={{ marginTop: 20 }}>
                        <OutlineButton
                            title="Sign In"
                            color="orange"
                            size={18}
                            width="100%"
                            height={50}
                            onPress={() => navigation.navigate("Login")}
                        />
                    </View>
                </View>
            </Animatable.View>
        </ImageBackground>
    );
};


// Styling Part..
// @override from Splash Screen..
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'royalblue',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black'
    },
    footer: {
        flex: 4,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontweight: 'bold',
    }
});

export default Register;