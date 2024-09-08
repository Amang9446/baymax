import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../utils/Constants'
import BackGround from '../components/baymax/BackGround'
import Loading from '../components/baymax/Loading'
import BigHero6 from '../components/baymax/BigHero6'
import { playTTS } from '../utils/ttsListners'
import SoundPlayer from 'react-native-sound-player'
import { playSound } from '../utils/VoiceUtils'
import { prompt } from '../utils/data'
import Instructions from '../components/baymax/Instructions'
import Pedometer from '../components/pedometer/Pedometer'
import { askAi } from '../service/apiService'

const BaymaxScreen: FC = () => {
    const [showInstructions, setShowInstructions] = React.useState(false);
    const [showLoader, setShowLoader] = React.useState(true);
    const [message, setMessage] = React.useState('');
    const [showPedometer, setShowPedometer] = React.useState(false);

    const blurOpacity = React.useRef(new Animated.Value(0)).current;
    const startBlur = () => {
        Animated.timing(blurOpacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }

    const stopBlur = () => {
        Animated.timing(blurOpacity, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }

    const handleError = (err: string) => {
        playTTS('There was an error, please try again')
        startBlur()
        setMessage('')
        setShowLoader(true)
        SoundPlayer.stop()
        setShowInstructions(false)
        console.log(err)
    }

    const handleResponse = async (type: string, promptText: string, sound: string) => {
        try {
            if (type === 'meditation') {
                playTTS('Focus on your breath')
                playSound(sound)
                setMessage('meditation')
                return
            }
            const data = await askAi(promptText)
            console.log(data)
            setMessage(data)
            playTTS(data)
            if (type === 'happiness') {
                setTimeout(() => {
                    playSound(sound)
                }, 5000)
            } else {
                playSound(sound)
            }
            stopBlur()
        } catch (error: any) {
            handleError(error)
        } finally {
            setShowLoader(false)
        }
    }

    const onOptionPressHandler = (type: string) => {
        console.log('Pressed', type)
        setShowInstructions(true)
        if (type === 'pedometer') {
            setShowPedometer(true)
            setShowLoader(false)
            return
        }
        switch (type) {
            case 'meditation':
                handleResponse(type, prompt.health, 'meditation')
                break
            case 'health':
                handleResponse(type, prompt.health, 'meditation')
                break
            case 'happiness':
                handleResponse(type, prompt.joke, 'laugh')
                break
            case 'motivation':
                handleResponse(type, prompt.motivation, 'motivation')
                break
            default:
                handleError('There was no type like this')
                break
        }
    }

    React.useEffect(() => {
        const timer = setTimeout(startBlur, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <View style={styles.container}>

            {
                message && (
                    <Instructions
                        onCross={() => {
                            startBlur()
                            setMessage('')
                            setShowLoader(true)
                            SoundPlayer.stop()
                            setShowInstructions(false)
                        }}
                        message={message}
                    />
                )
            }
            {
                showPedometer && (
                    <Pedometer
                        onCross={() => {
                            startBlur()
                            setMessage('')
                            setShowLoader(true)
                            setShowPedometer(false)
                            SoundPlayer.stop()
                            setShowInstructions(false)
                        }}
                        message={message}
                    />
                )
            }
            {
                showLoader &&
                <View style={styles.loaderContainer}>
                    <Loading />
                </View>
            }
            {
                !showInstructions &&
                <BigHero6 onPress={onOptionPressHandler} />
            }
            <BackGround blurOpacity={blurOpacity} />
        </View>
    )
}

export default BaymaxScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondry
    },
    loaderContainer: {
        position: 'absolute',
    }
})