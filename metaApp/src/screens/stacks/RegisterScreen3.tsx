import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useRegister from '../../hooks/useRegister';
import { Button as CustomButton, OutlineButton } from '../../components/widgets/Button.tsx';
import Toast from 'react-native-toast-message';

type Register3Props = {
  navigation?: {
    navigate: any;
  };
  route?: {
    params: {
      [key: string]: any;
    };
  };
};

interface DataState {
  bio: string;
  title: string;
  birthDate: string;
  [key: string]: any;
}

const Register3: React.FC<Register3Props> = ({ navigation, route }) => {

  // Using the exact same pattern as the working example
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { registerAction, registerLoading } = useRegister();
  const [data, setData] = useState<DataState>({
    ...(route?.params as any),
    bio: '',
    title: '',
    birthdate: '',
  });

  // region onChange Input
  const textInputChange = (value: string, type: keyof DataState) => {
    setData((prevData) => ({
      ...prevData,
      [type]: value,
    }));
  };

  // Exact same functions as the working example
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    const formatted = date.toISOString().split('T')[0];
    setData((prev) => ({
      ...prev,
      birthDate: formatted,
    }));
    hideDatePicker();
  };

  const handleRegister = async () => {
    if (!route?.params) return;

    const finalPayload = {
      firstname: route.params.firstName,
      lastname: route.params.lastName,
      email: route.params.email,
      password: route.params.password,
      birthdate: data.birthDate,
      bio: data.bio.trim(),
      title: data.title.trim(),
    };

    console.log(finalPayload);

    try {

      const res = await registerAction(finalPayload);
      console.log('Registered:', res);
      navigation?.navigate('UploadProfile', res);
    } catch (err: any) {
      console.error('Register error:', JSON.stringify(err, null, 2));
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: err?.data?.message || err?.message || "Something went wrong",
      });
    }

  };


  // region UI
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/post1.jpg')}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign Up</Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={[styles.text_footer, { marginTop: 20 }]}>Bio</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="I am Simple Human"
            style={styles.textInput}
            onChangeText={(value) => textInputChange(value, 'bio')}
            value={data.bio}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>Title</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Doctor"
            style={styles.textInput}
            onChangeText={(value) => textInputChange(value, 'title')}
            value={data.title}
          />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>Birth Date</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            value={data.birthDate}
            editable={false}
            placeholder="Select your birth date"
          />
          {/* Using native Button like in the working example */}
          <Button title="Show Date Picker" onPress={showDatePicker} />
        </View>

        {/* Exact same DateTimePickerModal as the working example */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}

        />

        <View style={{ marginTop: 30 }}>
          <CustomButton
            title="Register"
            bgColor="lightgreen"
            size={18}
            textColor="white"
            height={50}
            onPress={handleRegister}
          />

          <View style={{ marginTop: 20 }}>
            <OutlineButton
              title="Back"
              color="red"
              size={18}
              width="100%"
              height={50}
              onPress={() => navigation?.navigate('Register2' as never, data)}
            />
          </View>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

// region Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#05375a',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'white',
    padding: 5,
    opacity: 0.7,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 5,
  },
});

export default Register3;
