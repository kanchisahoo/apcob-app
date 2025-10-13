import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  TextInput,
} from 'react-native';
import theme from '../theme';


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


interface CustomDropdownProps {
  label?: string;
  options: Array<{ label: string; value: any; }>;
  selectedValue: any;
  onValueChange: (value: any) => void;
  placeholder?: string;
  dropdownStyle?: any;
  labelStyle?: any;
  placeholderStyle?: any;
  itemStyle?: any;
  error?: boolean;
  errorMessage?: string;
  leftIcon?: any;
  rightIcon?: any;
  disable?: any;
}
const initialProps: CustomDropdownProps = {
  label: '',
  options: [],
  selectedValue: null,
  onValueChange: () => { },
  placeholder: 'Select',
  dropdownStyle: {},
  labelStyle: {},
  placeholderStyle: {},
  itemStyle: {},
  error: false,
  errorMessage: '',
  leftIcon: null,
  rightIcon: null,
  disable: false,
};

const CustomDropdown = (props: CustomDropdownProps) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dropdownLayout, setDropdownLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const dropdownRef = useRef(null);

  const [selectedLabel, setSelectedLabel] = useState('');


 const filteredOptions = Array.isArray(props.options)
  ? props.options.filter(option =>
      option?.label?.toLowerCase().includes(searchText?.toLowerCase())
    )
  : [];




  useEffect(() => {
    // Update selectedLabel whenever selectedValue changes
    if (props.selectedValue !== null) {
      const updatedLabel = props?.options?.find(option => option.value === props.selectedValue)?.label || '';
      setSelectedLabel(updatedLabel);
    } else {
      setSelectedLabel(''); // Clear label if selectedValue is null
    }
  }, [props.selectedValue, props.options]);

  const measureDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownLayout({
          x: pageX,
          y: pageY,
          width: width,
          height: height,
        });
      });
    }
  };

  const onOptionSelect = (option: { label: string; value: any }) => {
    setSelectedLabel(option.label);
    setDropdownVisible(false);
    props.onValueChange(option.value);
  };

  const toggleDropdown = () => {
    measureDropdown();
    setDropdownVisible(!isDropdownVisible);
  };

  // Calculate if dropdown should open upward
  const shouldOpenUpward = () => {
    const spaceBelow = windowHeight - dropdownLayout.y - dropdownLayout.height;
    const optionsHeight = Math.min(props?.options?.length * 45, windowHeight * 0.3);
    return spaceBelow < optionsHeight && dropdownLayout.y > optionsHeight;
  };

  return (
    <View style={[styles.dropdownContainer, props.dropdownStyle]}>
      {/* Label */}
      {!!props.label && (
        <Text style={[styles.labelStyle, props.labelStyle]}>{props.label}</Text>
      )}

      {/* Dropdown button */}
      <TouchableOpacity
        ref={dropdownRef}
        style={[
          styles.dropdownButton,
          isDropdownVisible && styles.dropdownButtonActive,
        ]}
        onPress={toggleDropdown}
        disabled={props.disable}>
        {!!props.leftIcon && (
          <Image style={styles.iconStyle} source={props.leftIcon} />
        )}

        <Text
          style={[
            styles.selectedText,
            selectedLabel ? {} : styles.placeholderText,
            selectedLabel ? {} : props.placeholderStyle,
          ]}>
          {selectedLabel || props.placeholder}
        </Text>

        <Image
          style={[
            styles.rightIconStyle,
            isDropdownVisible && styles.rightIconRotate,
          ]}
          source={require("../../assets/images/down_arrow.png")}
        />
      </TouchableOpacity>

      {/* Modal for dropdown options */}
      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.dropdownList,
                {
                  position: 'absolute',
                  top: shouldOpenUpward()
                    ? dropdownLayout.y - Math.min(props.options.length * 45, windowHeight * 0.3)
                    : dropdownLayout.y + dropdownLayout.height,
                  left: dropdownLayout.x,
                  width: dropdownLayout.width,
                  maxHeight: windowHeight * 0.3,
                },
              ]}>
              <View style={{ padding: 10 }}>
                <TextInput
                  placeholder="Search..."
                  value={searchText}
                  onChangeText={setSearchText}
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    height: 40,
                    marginBottom: 10,
                  }}
                  placeholderTextColor="#000000"
                />
              </View>

              <ScrollView bounces={false}>
                {filteredOptions?.length > 0 ? (
                  filteredOptions?.map((option, index) => (
                    <TouchableOpacity
                      key={option.value || index}
                      style={styles.optionItem}
                      onPress={() => onOptionSelect(option)}>
                      <Text style={styles.optionText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.loaderContainer}>
                    <Text style={{ color: theme.colors.cardTitle }}>No results found</Text>
                  </View>
                )}
              </ScrollView>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Error message */}
      {props.error && <Text style={styles.errorText}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    // marginHorizontal: 0,
    zIndex: 1000,
  },
  labelStyle: {
    fontSize: 14,
    color: theme.colors.black,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#979797',
    borderRadius: 5,
    height: 48,
    backgroundColor: theme.colors.white,
    paddingLeft: 10,
    paddingRight: 10,

  },
  dropdownButtonActive: {
    borderColor: theme.colors.primary,
  },
  selectedText: {
    fontSize: 16,
    color: theme.colors.cardTitle,
    flex: 1,
  },
  placeholderText: {
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rightIconStyle: {
    width: 16,
    height: 16,
    transform: [{ rotate: '0deg' }],
  },
  rightIconRotate: {
    transform: [{ rotate: '180deg' }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownList: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.cardTitle,
  },
  optionRightIcon: {
    height: 16,
    width: 16,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  searchInputWrapper: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#000',
  },

});

export default CustomDropdown;