import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { bigHero6Data } from '../../utils/data'
import Water from '../options/Water'
import OptionItem from '../options/OptionItem'

const BigHero6: FC<{ onPress: (type: string) => void }> = ({ onPress }) => {
    const animatedValues = React.useRef([...Array(6)].map(() => new Animated.Value(0))).current;
    React.useEffect(() => {
        Animated.stagger(100, animatedValues.map((value, index) =>
            Animated.timing(value, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
                delay: index * 200
            })
        )).start();
    }, [])
    return (
        <View style={styles.circle}>
            {
                bigHero6Data.map((item, index) => {
                    const angle = (index / 6) * Math.PI * 2;
                    const x = screenWidth * 0.38 * Math.cos(angle);
                    const y = screenWidth * 0.38 * Math.sin(angle);
                    const translateY = animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, y]
                    })
                    const translateX = animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, x]
                    })
                    return (
                        <Animated.View
                            style={[styles.item, { transform: [{ translateX }, { translateY }] }]}
                            key={index}>
                            {
                                item !== 'water' && <OptionItem onPress={onPress} item={item} />
                            }
                            {
                                item === 'water' &&
                                <Water />
                            }
                        </Animated.View>
                    )
                })
            }
        </View>
    )
}

export default BigHero6

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    item: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 400,
    }
})