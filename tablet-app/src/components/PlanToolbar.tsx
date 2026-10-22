import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton, goBack } from '@/components/ui';
import { useScale } from '@/theme';

/** Back / zoom in / reset buttons for plan screens (top-right, like the web version). */
export function PlanToolbar({ onZoomIn, onReset, zoomed }: { onZoomIn: () => void; onReset: () => void; zoomed: boolean }) {
  const { s } = useScale();
  const size = s(48);
  return (
    <View style={[styles.wrap, { top: s(18), right: s(18), gap: s(12) }]}>
      <IconButton label="Go back" onPress={goBack} size={size} style={styles.btn} testID="plan-back">
        <Ionicons name="arrow-back" size={s(24)} color="#111" />
      </IconButton>
      <IconButton label="Zoom in" onPress={onZoomIn} size={size} style={styles.btn} testID="plan-zoom">
        <Ionicons name="add" size={s(26)} color="#111" />
      </IconButton>
      <IconButton label="Reset zoom" onPress={onReset} size={size} style={styles.btn} disabled={!zoomed}>
        <MaterialCommunityIcons name="fit-to-screen-outline" size={s(22)} color="#111" />
      </IconButton>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', zIndex: 20 },
  btn: { backgroundColor: 'rgba(255,255,255,0.85)', borderColor: '#d1d5db', borderRadius: 10 },
});
