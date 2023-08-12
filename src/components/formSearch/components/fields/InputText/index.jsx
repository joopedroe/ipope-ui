import React, { useState, useEffect } from 'react';
import {

  TextField,
} from '@mui/material';


const QuestionCreator = ({setNewField, field}) => {
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    setNewField({ ...field, question: event.target.value });
  };

  useEffect(() => {
    if (field) {
      setQuestion(field.question);
    }
  }, []);


  return (
    <div>
        <TextField
          sx={{ width: '100%' }}
          label="Pergunta"
          value={question}
          onChange={handleQuestionChange}
          fullWidth
          margin="normal"
        />
    </div>
  );
};

export default QuestionCreator;
