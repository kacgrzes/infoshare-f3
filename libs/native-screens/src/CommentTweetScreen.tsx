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
import tw from 'twrnc';
import { useCommentTweetForm } from '@infoshare-f3/forms';

export const CommentTweetScreen = () => {
  const nativeId = 'tweet-input';
  const maxCharacters = 160;
  const inputRef = useRef<TextInput>();
  const { setParams, goBack } = useNavigation();
  const { control, onSubmit, formState } = useCommentTweetForm();

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
                selectionColor={tw.color('blue-400')}
                style={tw`text-xl flex-grow p-4`}
                ref={inputRef}
                inputAccessoryViewID={nativeId}
                placeholder={'Skomentuj tweeta'}
                placeholderTextColor={tw.color('slate-400')}
                onBlur={field.onBlur}
              >
                {[
                  field.value.slice(0, maxCharacters),
                  field.value.slice(maxCharacters),
                ].map((text, index) => {
                  return (
                    <Text
                      key={index}
                      style={[index === 1 && tw`bg-red-200`]}
                    >
                      {text}
                    </Text>
                  );
                })}
              </TextInput>
              <InputAccessoryView nativeID={nativeId}>
                <View
                  style={tw`bg-white border-t border-t-slate-200 p-4 items-end`}
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
