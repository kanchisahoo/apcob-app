import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  useAnimatedValue,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';

const CarouselComponent = () => {
  const scrollX = useAnimatedValue(0);
  const { width: windowWidth } = useWindowDimensions();
  const images = new Array(5).fill('https://i.pravatar.cc/300?img=1');

  return (
    <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
      <View style={styles.scrollContainer}>
        {/* Scrollable images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <View style={{ width: windowWidth - 31, height: 200 }} key={index}>
              <ImageBackground
                source={require('../../../assets/images/banner.png')}
                style={styles.card}
                // width={180}
                imageStyle={{ resizeMode: 'cover' }}
              />
            </View>
          ))}
        </ScrollView>

        {/* Indicator Dots */}
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });

            const backgroundColor = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: ['transparent', 'grey', 'transparent'],
              extrapolate: 'clamp',
            });

            const borderColor = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: ['grey', 'grey', 'grey'],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.normalDot,
                  {
                    width,
                    backgroundColor,
                    borderColor,
                    borderWidth: 1,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  scrollContainer: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop:"10%"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 5,
    borderRadius: 10,
    // width: 300,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
});
