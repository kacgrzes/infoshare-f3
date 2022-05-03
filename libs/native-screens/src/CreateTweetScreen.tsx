import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
  StatusBar,
  Text,
  InputAccessoryView,
  View,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

export const CreateTweetScreen = () => {
  const { setParams } = useNavigation();
  const nativeId = 'tweet-input';
  const maxCharacters = 160;
  const inputRef = useRef<TextInput>();
  const tailwind = useTailwind();
  const [value, setValue] = useState<string>('');

  const onChangeText = useCallback((value) => {
    setValue(value);
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    setParams({
      disabled: value.length === 0 || value.length > maxCharacters,
    });
  }, [value, setParams]);

  return (
    <>
      <StatusBar barStyle="light-content" animated />
      <TextInput
        multiline
        onChangeText={onChangeText}
        selectionColor={'#1DA1F2'}
        style={tailwind('text-xl flex-grow p-4')}
        ref={inputRef}
        inputAccessoryViewID={nativeId}
        placeholder={'Co się dzieje?'}
        placeholderTextColor={'#657786'}
      >
        {[value.slice(0, maxCharacters), value.slice(maxCharacters)].map(
          (text, index) => {
            return (
              <Text key={index} style={[index === 1 && tailwind('bg-red-200')]}>
                {text}
              </Text>
            );
          }
        )}
      </TextInput>
      <InputAccessoryView nativeID={nativeId}>
        <View
          style={tailwind(
            'bg-white border-t border-t-light-gray p-4 items-end'
          )}
        >
          <Text>
            {value.length} / {maxCharacters}
          </Text>
        </View>
      </InputAccessoryView>
    </>
  );
};
