import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    StyleSheet
} from 'react-native';
import { 
    Entypo, 
    FontAwesome, 
    Ionicons, 
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';


// Edit Profile Component..
const EditProfile = () => {

    renderInner = () => (
        <Text>Hello</Text>
    );

    renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    );

    bs = React.createRef(null);
    fall = new Animated.Value(1);

    return (
        <View style={styles.container}>

            <BottomSheet 
                ref={this.bs}
                shapPoints={[330, 0]}
                renderContents={this.renderInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
            />

            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                        <View style={{
                            height: 100,
                            width: 100,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <ImageBackground
                                source={require('../assets/images/asadanik.jpg')}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}
                            >
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Entypo
                                        name="camera"
                                        size={24}
                                        color="white"
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: 'white',
                                            borderRadius: 10
                                        }}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>

                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        Asad Anik
                    </Text>
                </View>
                
                {/* ---- First Name ---- */}
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="black" />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                
                {/* ---- Last Name ---- */}
                <View style={styles.action}>
                    <FontAwesome name="user-o" size={20} color="black" />
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                
                {/* ---- Email ----- */}
                <View style={styles.action}>
                <MaterialCommunityIcons name="email-multiple-outline" size={20} color="black" />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                
                {/* ---- Number ---- */}
                <View style={styles.action}>
                    <Feather name="phone" size={20} color="black" />
                    <TextInput
                        placeholder="Number"
                        placeholderTextColor="#666"
                        keyboardType='number-pad'
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                
                {/* ---- Country ---- */}
                <View style={styles.action}>
                <Ionicons name="earth-outline" size={24} color="black" />
                    <TextInput
                        placeholder="Country"
                        placeholderTextColor="#666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>
                
                {/* ---- City ---- */}
                <View style={styles.action}>
                <Ionicons name="location-outline" size={24} color="black" />
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#666"
                        autoCorrect={false}
                        style={styles.textInput}
                    />
                </View>

                <TouchableOpacity style={styles.commandButton} onPress={() => alert('Update Profile!')}>
                        <Text style={styles.panelButtonTitle}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// StyleSheet..
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ff6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    header: {
        backgroundColor: '#fff',
        shadowColor: '#333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#ff6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ff0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});

export default EditProfile;