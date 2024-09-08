import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { circleRadius } from '../../utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OptionItem: FC<{ item: any, onPress: (type: string) => void }> = ({ item, onPress }) => {
    let iconName;
    let iconColor = '#fff';
    switch (item) {
        case 'meditation':
            iconName = 'nature-people'
            iconColor = '#2DEC72'
            break;
        case 'pedometer':
            iconName = 'directions-run'
            iconColor = '#2D7BA4'
            break;
        case 'health':
            iconName = 'health-and-safety'
            iconColor = 'green'
            break;
        case 'happiness':
            iconName = 'emoji-emotions'
            iconColor = '#FB26FF'
            break;
        default:
            iconName = 'local-fire-department'
            iconColor = '#FFBC66'
            break;
    }
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
            <Icon name={iconName} size={RFValue(32)} color={iconColor} />
        </TouchableOpacity>
    )
}

export default OptionItem

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
    }
})  