import React, { useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput,
  StatusBar,
  Text,
  InputAccessoryView,
  View,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useCreateTweetForm } from '@infoshare-f3/forms';

export const CommentTweetScreen = () => {
  const nativeId = 'tweet-input';
  const maxCharacters = 160;
  const inputRef = useRef<TextInput>();
  const tailwind = useTailwind();
  const { setParams, goBack } = useNavigation();
  const { control, onSubmit, formState } = useCreateTweetForm();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    setParams({
      disabled: !formState.isValid,
      onPress: () => {
        onSubmit();
        goBack();
      },
    });
  }, [formState.isValid]);

  return (
    <>
      <StatusBar barStyle="light-content" animated />
      <Controller
        control={control}
        name="text"
        render={({ field }) => {
          return (
            <>
              <TextInput
                multiline
                onChangeText={field.onChange}
                selectionColor={'#1DA1F2'}
                style={tailwind('text-xl flex-grow p-4')}
                ref={inputRef}
                inputAccessoryViewID={nativeId}
                placeholder={'Co się dzieje?'}
                placeholderTextColor={'#657786'}
                onBlur={field.onBlur}
              >
                {[
                  field.value.slice(0, maxCharacters),
                  field.value.slice(maxCharacters),
                ].map((text, index) => {
                  return (
                    <Text
                      key={index}
                      style={[index === 1 && tailwind('bg-red-200')]}
                    >
                      {text}
                    </Text>
                  );
                })}
              </TextInput>
              <InputAccessoryView nativeID={nativeId}>
                <View
                  style={tailwind(
                    'bg-white border-t border-t-light-gray p-4 items-end'
                  )}
                >
                  <Text>
                    {field.value.length} / {maxCharacters}
                  </Text>
                </View>
              </InputAccessoryView>
            </>
          );
        }}
      />
    </>
  );
};
