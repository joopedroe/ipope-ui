import React, { useEffect, useState } from 'react';
import { Button as ButtonAntd } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Checkbox
} from '@mui/material';
import { set } from 'lodash';


const QuestionCreator = ({ type, setNewField, field }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ id: 0, value: '' }]);
  const [selectedOption, setSelectedOption] = useState('');

  const dispatch = useDispatch();
  let fieldState = useSelector(state => state.field);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
    setNewField({ ...field, question: event.target.value });
  };


  const handleOptionChange = (event, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].value = event.target.value;
    setOptions(updatedOptions);
    setNewField({ ...field, options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOption = { id: options.length, value: '' };
    setOptions([...options, newOption]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((option) => option.id !== index);
    setOptions(updatedOptions);
  };

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSaveQuestion = () => {
    // Aqui você pode fazer o que desejar com a pergunta e as opções
    console.log('Pergunta:', question);
    console.log('Opções:', options);
    console.log('Opção selecionada:', selectedOption);
  };

  useEffect(() => {
    fieldState = ({ question, options });
  }, [question, options]);

  useEffect(() => {
    if (field) {
      setQuestion(field.question || '');
      setOptions(field.options || []);
    }
  }, []);

  

  return (
    <div>
      <FormControl component="fieldset"
        sx={{ width: '100%' }}>
        <TextField
          label="Pergunta"
          value={question}
          onChange={handleQuestionChange}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1">Opções de Resposta:</Typography>
        <RadioGroup name="options"
          value={selectedOption}
          >
          {options.map((option, index) => (
            <div key={option.id}>
              <FormControlLabel
                sx={{ width: '100%' }}
                value={option.value}
                control={type === 'checkbox' ? <Checkbox /> : <Radio />}
                label={
                  <div style={{ display: 'flex', width: '600px', alignItems: 'center' }}>
                    <TextField
                      size='small'
                      sx={{ padding: '3px', width: '100%' }}
                      className='radio-option-input-response'
                      value={option.value}
                      onChange={(event) => handleOptionChange(event, index)}
                      margin="dense"
                    />
                    <ButtonAntd
                      onClick={() => handleRemoveOption(option.id)}
                      type="text" icon={<DeleteOutlined />} />
                  </div>
                }
              />
            </div>
          ))}
        </RadioGroup>
        {
          type === 'inputText' && (
            <TextField
              size='small'
              label="Campo de resposta adicional"
              disabled={true}
              fullWidth
              margin="normal"
            />
          )
        }
        <Button variant="outlined"
          onClick={handleAddOption}>
          Adicionar Opção
        </Button>
      </FormControl>
    </div>
  );
};


export default QuestionCreator;
