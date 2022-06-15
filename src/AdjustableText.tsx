import React from 'react';
import {
  PixelRatio,
  Platform,
  Text,
  TextProps,
  useWindowDimensions,
} from 'react-native';

export function normalize(size: number, width: number) {
  const scale = width / 320;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const AdjustableText: React.FC<TextProps & { fontSize?: number }> = ({
  style,
  children,
  fontSize = 18,
  ...props
}) => {
  const { width } = useWindowDimensions();

  return (
    <Text
      {...props}
      adjustsFontSizeToFit
      numberOfLines={1}
      style={[
        style,
        { fontFamily: 'monospace', fontSize: normalize(fontSize, width) },
      ]}
    >
      {children}
    </Text>
  );
};

export default AdjustableText;
