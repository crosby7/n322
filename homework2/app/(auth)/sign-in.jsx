import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput, Button } from "react-native-paper"
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter, Link } from "expo-router";
import { Colors } from "@/constants/Colors"

export default function SignIn() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = React.useState();
    const [password, setPassword] = React.useState();

    onSignIn = React.useCallback(async () => {
        if (!isLoaded) {
            return;
        }
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password: password
            });

            if (signInAttempt.status === "complete") {
                await setActive({
                    session: signInAttempt.createdSessionId
                });
                router.push("/(tabs)");
            }
            else {
                console.errror("Sign in status error: ", JSON.stringify(signInAttempt, null, 2))
            }
        }
        catch (e) {
            console.error("Sign In Error: ", e);
        }
    }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
        <View style={styles.signInArea}>
            <TextInput
                autoCapitalize='none'
                value={emailAddress}
                keyboardType='email-address'
                placeholder='Email Address'
                onChangeText={setEmailAddress}
            />
            <TextInput
                value={password}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button mode="outlined" onPress={onSignIn}>
                <Text>Sign In</Text>
            </Button>
        </View>
        <View style={styles.needAccount}>
            <Text>Don't have an account?</Text>
            <Link style={styles.signUpButton} href="/sign-up">
            <Text>Sign Up</Text>
            </Link>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1
    },
    signInArea: {
        marginBottom: 20
    },
    needAccount: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    signUpButton: {
        marginTop: 5,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: Colors.DEV_PRIMARY,
        color: "#fff",
        borderRadius: 15
    }
})