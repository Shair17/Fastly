import React from 'react';
import {useTheme} from 'react-native-magnus';
import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  BackdropFilter,
  Blur,
  useComputedValue,
} from '@shopify/react-native-skia';
import {useDimensions} from '@fastly/hooks/useDimensions';

export const MyBlur: React.FC = () => {
  const {theme} = useTheme();
  const {
    window: {width, height},
  } = useDimensions();
  const c = vec(width / 2 + width, (height / 2) * 1.5);
  const r = c.x - 32;
  const progress = useLoop({duration: 1e3 * 20});
  const start = useComputedValue(
    () => sub(c, vec(0, mix(progress.current, r, r))),
    [progress],
  );
  const end = useComputedValue(
    () => add(c, vec(0, mix(progress.current, r, r / 2))),
    [progress],
  );
  const radius = useComputedValue(
    () => mix(progress.current, r, r / 2),
    [progress],
  );

  return (
    <Canvas style={{width: '100%', height: '100%', position: 'absolute'}}>
      <Fill color="white" />
      <Circle c={c} r={radius}>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FEF0E3', '#FEF3E1']}
        />
      </Circle>
      <BackdropFilter filter={<Blur blur={20} />}>
        <Fill color="#DFE3E610" />
      </BackdropFilter>
    </Canvas>
  );
};
