import { forwardRef, useImperativeHandle, useState, type ReactNode } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native';
import {
  GestureDetector,
  useExclusiveGestures,
  usePanGesture,
  usePinchGesture,
  useSimultaneousGestures,
  useTapGesture,
} from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export type ZoomableHandle = { zoomIn: () => void; reset: () => void };

type Props = {
  children: ReactNode;
  maxScale?: number;
  style?: StyleProp<ViewStyle>;
  onScaleChange?: (zoomed: boolean) => void;
  /** double-tap to zoom; turn off where children use taps themselves (plans) */
  doubleTapZoom?: boolean;
};

const TIMING = { duration: 220 };

/**
 * Pinch to zoom, drag to pan, double-tap to zoom in/out. Runs entirely on the
 * UI thread (Reanimated worklets) so it stays smooth on large plan images.
 * Single taps pass through to children (e.g. selecting a unit on a plan).
 */
export const Zoomable = forwardRef<ZoomableHandle, Props>(function Zoomable(
  { children, maxScale = 4, style, onScaleChange, doubleTapZoom = true },
  ref,
) {
  // Pan is only enabled while zoomed, so swipes reach parent lists at 1x.
  const [isZoomed, setIsZoomed] = useState(false);
  const width = useSharedValue(1);
  const height = useSharedValue(1);
  const scale = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const start = useSharedValue({ scale: 1, tx: 0, ty: 0 });

  const clampX = (x: number, s: number) => {
    'worklet';
    const max = (width.value * (s - 1)) / 2;
    return Math.min(max, Math.max(-max, x));
  };
  const clampY = (y: number, s: number) => {
    'worklet';
    const max = (height.value * (s - 1)) / 2;
    return Math.min(max, Math.max(-max, y));
  };
  const animateTo = (s: number, x: number, y: number) => {
    'worklet';
    scale.value = withTiming(s, TIMING);
    tx.value = withTiming(clampX(x, s), TIMING);
    ty.value = withTiming(clampY(y, s), TIMING);
  };

  // called from UI-thread worklets via scheduleOnRN; updates React state
  const notify = (zoomed: boolean) => {
    setIsZoomed(zoomed);
    onScaleChange?.(zoomed);
  };

  const pinch = usePinchGesture({
    onBegin: () => {
      start.value = { scale: scale.value, tx: tx.value, ty: ty.value };
    },
    onUpdate: (e) => {
      const s0 = start.value.scale;
      const s = Math.min(maxScale * 1.15, Math.max(0.85, s0 * e.scale));
      // keep the point under the fingers fixed while scaling
      const fx = e.focalX - width.value / 2;
      const fy = e.focalY - height.value / 2;
      scale.value = s;
      tx.value = fx - (fx - start.value.tx) * (s / s0);
      ty.value = fy - (fy - start.value.ty) * (s / s0);
    },
    onDeactivate: () => {
      const s = Math.min(maxScale, Math.max(1, scale.value));
      animateTo(s, s === 1 ? 0 : tx.value, s === 1 ? 0 : ty.value);
      scheduleOnRN(notify, s > 1.01);
    },
    runOnJS: false,
  });

  const pan = usePanGesture({
    enabled: isZoomed,
    minDistance: 8,
    maxPointers: 2,
    onBegin: () => {
      start.value = { scale: scale.value, tx: tx.value, ty: ty.value };
    },
    onUpdate: (e) => {
      if (scale.value <= 1.01) return;
      tx.value = clampX(start.value.tx + e.translationX, scale.value);
      ty.value = clampY(start.value.ty + e.translationY, scale.value);
    },
    runOnJS: false,
  });

  const doubleTap = useTapGesture({
    enabled: doubleTapZoom,
    numberOfTaps: 2,
    onActivate: (e) => {
      if (scale.value > 1.01) {
        animateTo(1, 0, 0);
        scheduleOnRN(notify, false);
      } else {
        const s = Math.min(2.5, maxScale);
        const fx = e.x - width.value / 2;
        const fy = e.y - height.value / 2;
        animateTo(s, -fx * (s - 1), -fy * (s - 1));
        scheduleOnRN(notify, true);
      }
    },
    runOnJS: false,
  });

  const gesture = useExclusiveGestures(doubleTap, useSimultaneousGestures(pinch, pan));

  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      const s = Math.min(maxScale, (scale.value < 1.5 ? 2 : scale.value + 1));
      animateTo(s, tx.value, ty.value);
      notify(true);
    },
    reset: () => {
      animateTo(1, 0, 0);
      notify(false);
    },
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }, { scale: scale.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    const { width: w, height: h } = e.nativeEvent.layout;
    width.value = w;
    height.value = h;
  };

  return (
    <GestureDetector gesture={gesture}>
      <View style={[styles.frame, style]} onLayout={onLayout} collapsable={false}>
        <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>{children}</Animated.View>
      </View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  frame: { overflow: 'hidden' },
});
