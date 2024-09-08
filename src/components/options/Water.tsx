import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { circleRadius } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useWaterStore } from '../../state/WaterStore'
import { playTTS } from '../../utils/ttsListners'
import { playSound } from '../../utils/VoiceUtils'

const Water = () => {
  const { waterDrinkStamps, addWaterIntake } = useWaterStore();
  const totalSegement = 8;
  const completedSegment = waterDrinkStamps.length;
  const containerStyle = [styles.container,
  completedSegment === totalSegement && styles.completed]
  const handleWaterIntake = async () => {
    if (completedSegment < totalSegement) {
      const timeStamp = new Date().toISOString()
      addWaterIntake(timeStamp)
      playSound('ting')
    } else {
      playTTS('You have reached your goal for today')
    }
  }
  return (
    <TouchableOpacity style={containerStyle} onPress={handleWaterIntake}>
      <Icon name='water' size={RFValue(24)} color='#1ca3ec' />
      <View style={styles.segmentContainer}>
        {Array.from({ length: totalSegement }).map((_, index) => (
          <View key={index}
            style={[
              styles.segment,
              { backgroundColor: completedSegment === totalSegement ? '#00D100' : index < completedSegment ? '#1ca3ec' : '#eee' },
              {
                transform: [{ rotate: `${(index * 360) / totalSegement}deg` },
                { translateX: circleRadius / 2 - 5 },
                ]
              },
            ]} />
        ))}
      </View>
    </TouchableOpacity>
  )
}

export default Water

const styles = StyleSheet.create({
  container: {
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowOffset: { width: 1, height: 1 },
    elevation: 10,
    shadowRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2
  },
  completed: {
    shadowColor: 'yellow',
    elevation: 10
  },
  segmentContainer: {
    position: 'absolute',
    height: circleRadius,
    width: circleRadius,
    borderRadius: circleRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    height: 4,
    width: 8,
    borderRadius: 2,
  }
})