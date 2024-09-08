import React, { FC } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors, Fonts } from '../../utils/Constants';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'body';
  fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: object) => void;
}

const fontSizes: Record<NonNullable<Props['variant']>, number> = {
  h1: 22, h2: 20, h3: 18, h4: 16, h5: 14,
  h6: 12, h7: 11, h8: 10, h9: 9, body: 12
};

const CustomText: FC<Props> = ({
  variant = 'body',
  fontFamily = Fonts.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
  onLayout,
  ...props
}) => {
  const computedFontSize = RFValue(fontSize || fontSizes[variant] || 14);

  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {
          color: Colors.text,
          fontSize: computedFontSize,
          fontFamily,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});