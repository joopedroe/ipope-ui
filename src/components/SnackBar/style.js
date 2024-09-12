import green from '@mui/material/colors/green';

export const styles = theme => ({
  default: {
    backgroundColor: 'rgba(49, 49, 49, 0.71)'
  },
  messageContent:{
    padding:0
  },
  container: {
    flexDirection: 'row',
    display: 'flex'
  },
  containerText:{
    display: 'flex',
    alignItems: 'center',
    marginRight: '10px'
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: '#E15554',
  },
  info: {
    backgroundColor: '#F5F5F5',
  },
  warning: {
    backgroundColor: '#F79824',
  },
});