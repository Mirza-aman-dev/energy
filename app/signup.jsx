import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import Input from '../components/Input'
import Button from '../components/Button'
import { supabase } from '../lib/supabase'

const Signup = () => {

  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const ssgn = async () => {
    try {
      let name = nameRef.current.trim();
      let email = emailRef.current.trim();
      let password = passwordRef.current.trim();

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        throw error; // Let the error be caught in the catch block
      }

      return data; // Return the data if signup is successful
    } catch (err) {
      console.error("Signup Error:", err.message);
      Alert.alert("Signup Error", err.message);
      throw err; // Re-throw the error so it can be handled in onSubmit
    }
  };

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert("Signup", "Please enter your name, email, and password");
      return;
    }

    setLoading(true);

    try {
      const data = await ssgn();
      console.log("Signup Successful:", data);
    } catch (error) {
      // Error is already handled in ssgn
    } finally {
      setLoading(false); // Ensure the loader is stopped in all cases
    }
  };

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark' />
      <ScrollView>
        <View style={styles.container}>
          <BackButton router={router} />

          {/* welcome text */}
          <View>
            <Text style={styles.welcomeText}>Let's</Text>
            <Text style={styles.welcomeText}>Get Started</Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>Please fill the details to create an account</Text>
            <Input
              icon={<Icon name='user' size={26} strokeWidth={1.6} />}
              placeholder='Enter you Name'
              onChangeText={value => nameRef.current = value}
            />
            <Input
              icon={<Icon name='mail' size={26} strokeWidth={1.6} />}
              placeholder='Enter you email'
              autoCapitalize="none"
              onChangeText={value => emailRef.current = value}
            />
            <Input
              icon={<Icon name='lock' size={26} strokeWidth={1.6} />}
              placeholder='Enter you password'
              secureTextEntry
              onChangeText={value => passwordRef.current = value}
            />
            {/* button */}
            <Button title='Signup' loading={loading} onpress={onSubmit} />
          </View>
          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>
            <Pressable onPress={() => router.push('login')} >
              <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text
  },
  form: {
    gap: 25
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  }, footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  }
})