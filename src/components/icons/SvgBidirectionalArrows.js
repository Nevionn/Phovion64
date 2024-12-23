import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgBidirectionalArrows = ({color}) => {
  return (
    <Svg viewBox="0 0 24 24" height={24} width={24}>
      <Path fill={color} d="M9 3 5 7h3v7h2V7h3m3 10v-7h-2v7h-3l4 4 4-4h-3Z" />
    </Svg>
  );
};

export default SvgBidirectionalArrows;
