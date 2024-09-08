import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts, lightColors } from '../utils/Constants'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { screenHeight, screenWidth } from '../utils/Scaling'
import LinearGradient from 'react-native-linear-gradient'
import CustomText from '../components/global/CustomText'
import LottieView from 'lottie-react-native'
import { initializeTtsListners, playTTS } from '../utils/ttsListners'
import { resetAndNavigate } from '../utils/NavigationUtils'
import { playSound } from '../utils/VoiceUtils'
const bottomColors = [...lightColors.reverse()]
const SplashScreen: FC = () => {
  const baymaxAnnimation = useSharedValue(screenHeight * 0.8);
  const messageContainerAnimation = useSharedValue(screenHeight * 0.8);
  const launchAnimation = async () => {
    messageContainerAnimation.value = screenHeight * 0.001;
    playSound('ting2')
    setTimeout(() => {
      baymaxAnnimation.value = -screenHeight * 0.02;
      playTTS('Hello world! I am Baymax');
    }, 600)
    setTimeout(() => {
      resetAndNavigate('Baymax')
    }, 4000)
  }
  React.useEffect(() => {
    launchAnimation()
    initializeTtsListners()
  }, [])
  const animateImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: withTiming(baymaxAnnimation.value,
          {
            duration: 1500,
          }
        )
      }]
    }
  })
  const messageContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: withTiming(messageContainerAnimation.value,
          {
            duration: 1200,
          }
        )
      }]
    }
  })
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imgContainer, animateImageStyle]}>
        <Image
          source={require('../assets/images/launch.png')}
          style={styles.img}
        />
      </Animated.View>
      <Animated.View style={[styles.gradientContainer, messageContainerStyle]}>
        <LinearGradient
          colors={bottomColors}
          style={styles.gradient}
        >
          <View style={styles.textContainer}>
            <CustomText fontSize={34} fontFamily={Fonts.Theme}>
              BayMAx
            </CustomText>
            <LottieView
              source={require('../assets/animations/syncing.json')}
              style={{ width: 280, height: 100 }}
              autoPlay={true}
              loop={true}
            />
            <CustomText>
              Syncronizing best configuration for you
            </CustomText>
          </View>
        </LinearGradient>

      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    alignItems: 'center',
    shadowColor: Colors.border,
  },
  gradientContainer: {
    position: 'absolute',
    height: '35%',
    width: '100%',
    bottom: 0
  },
  gradient: {
    height: '100%',
    width: '100%',
    paddingTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  imgContainer: {
    width: screenWidth - 20,
    height: screenHeight * 0.5,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})

export default SplashScreen