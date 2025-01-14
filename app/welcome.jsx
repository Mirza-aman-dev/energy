import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { wp, hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useRouter } from 'expo-router'

const welcome = () => {

    const router = useRouter();

    return (
        <ScreenWrapper bg='white'>
            <StatusBar style='dark' />
            <View style={styles.container}>
                {/* Welcome image */}
                <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcome.png')} />
                {/* title */}
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>Energy</Text>
                    <Text style={styles.punchline}>
                        where every thoughts finds a home and every image tells a story.
                    </Text>
                </View>
                {/* footer */}
                <View style={styles.footer}>
                    <Button
                        title='Getting  Started'
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onpress={() => router.push('signup')}
                    />
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={() => router.push('login')}>
                            <Text style={[styles.loginText,{color:theme.colors.primaryDark,fontWeight:theme.fonts.semibold}]}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        width: wp(100),
        height: hp(30),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extrabold,
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontsize: hp(1.7),
        color: theme.colors.text,
    },
    footer: {
        gap: 30,
        width: '100%',
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    loginText:{
        textAlign:'center',
        color:theme.colors.text,
        fontSize:hp(1.6),

    },
})