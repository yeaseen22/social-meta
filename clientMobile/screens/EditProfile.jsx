import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import {
    FontAwesome,
    Ionicons,
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';
// import Animated from 'react-native-reanimated';
import BottomSheet from '../components/widgets/BottomSheet';
import { Button } from '../components/widgets/Button';
import ImagePicker from '../components/widgets/ImagePicker';


// Edit Profile Component..
const EditProfile = () => {
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const bottomSheetRef = useRef(null);

    // To Open Bottom Sheet..
    // const handleSnapPress = React.useCallback((index) => {
    //     bottomSheetRef.current?.snapToIndex(index);
    //     setIsBottomSheetOpen(0);
    // }, []);

    // Alternative Way to Open Bottom Sheet..
    const handleBottomSheetOpen = () => {
        bottomSheetRef.current?.expand();
        setIsBottomSheetOpen(true);
    };

    const handleBottomSheetClose = () => {
        bottomSheetRef.current?.close();
        setIsBottomSheetOpen(false);
    };

    // console.log('IsBottomSheetOpen -- ', isBottomSheetOpen);
    // console.log('BottomSheetRef -- ', bottomSheetRef);

    return (
        <View style={styles.container}>
            <View style={{ opacity: !isBottomSheetOpen ? 1 : 0.25 }}>
                <View style={{ margin: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <ImagePicker
                            image={require('../assets/images/asadanik.jpg')}
                            height={100}
                            width={100}
                            onPress={() => handleBottomSheetOpen()}
                        />

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

                    <Button
                        title="Update"
                        color1st="yellow"
                        color2nd="orange"
                        size={20}
                        height={50}
                        width="100%"
                        textColor="black"
                        onPress={() => alert('Upload!')}
                    />
                </View>
            </View>

            {/* ---- The Bottom Sheet here ---- */}
            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                setIsOpen={setIsBottomSheetOpen}
                snapPoint="50%"
            // handleSnapPress={handleSnapPress}
            >
                <View style={{ padding: 20 }}>
                    <Text style={styles.panelTitle}>Upload Photo</Text>
                    <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Take Photo"
                            color1st="yellow"
                            color2nd="orange"
                            size={20}
                            height={50}
                            width="100%"
                            textColor="black"
                            onPress={() => alert('Take Photo!')}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Upload Profile"
                            color1st="royalblue"
                            color2nd="blue"
                            size={20}
                            height={50}
                            width="100%"
                            textColor="white"
                            onPress={() => alert('Upload Photo!')}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Cancel"
                            color1st="brown"
                            color2nd="red"
                            size={20}
                            height={50}
                            width="100%"
                            textColor="white"
                            onPress={() => handleBottomSheetClose()}
                        />
                    </View>
                </View>
            </BottomSheet>
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
        textAlign: 'center',
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        textAlign: 'center',
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
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