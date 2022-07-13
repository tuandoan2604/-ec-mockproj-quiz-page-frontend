import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
// @ts-ignore
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import ItemLesson from '../../../components/ItemLesson';
import ContinueLesson from '../../../components/ContinueLesson';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addQuestion} from '../../../store/slices/GetQuestionSlice';

const width = Dimensions.get('window').width;

const ComputerScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [question, setQuestion] = useState();
  const token = useSelector(state => state.Auth.payload.tokens.access.token);
  const [isSelected, setIsSelected] = useState(true);

  const getQuestionData = useCallback(() => {
    axios
      .get('https://fwa-ec-quiz-mock1.herokuapp.com/v1/questions', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        const questionData = response.data.results;
        setQuestion(questionData);
        dispatch(addQuestion(questionData));
      })
      .catch(error => {
        console.log(error);
      });
  }, [question]);

  console.log(question);

  const goToDetail = useCallback(() => {
    navigation.navigate('DetailScreen');
  }, []);

  const changeStyleSelected = useCallback(() => {
    setIsSelected(!isSelected);
  }, [isSelected]);

  const getQuestion = useCallback(() => {
    getQuestionData();
    changeStyleSelected();
  }, [question, isSelected]);

  return (
    <Container>
      <TouchableOpacity
        onPress={getQuestion}
        style={{
          borderColor: isSelected ? '#fff' : '#3179e3',
          borderWidth: 1,
          marginTop: 16,
        }}>
        <ItemLesson title={'UI UX Design'} />
      </TouchableOpacity>
      <TouchableOpacity>
        <ItemLesson title={'Graphic Design'} />
      </TouchableOpacity>
      <ContinueQuizText>Continue Quiz</ContinueQuizText>
      <ContinueLesson title={'3D Animation'} />

      <StartBtn onPress={goToDetail}>
        <BtnText>Start Quiz</BtnText>
      </StartBtn>
    </Container>
  );
};

export default ComputerScreen;

const styles = StyleSheet.create({});

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ContinueQuizText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #333333;
  margin: 16px 0 0 24px;
`;

const StartBtn = styled.TouchableOpacity`
  width: ${width - 24}px;
  height: 50px;
  background-color: #3179e3;
  align-self: center;
  margin-top: 56px;
  border-radius: 5px;
  justify-content: center;
`;

const BtnText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: #ffffff;
  text-align: center;
`;
