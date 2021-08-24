import React from 'react'

import Form from './components/Form'

const App = () => {
  return (
    <div style={localStyles.container}>
      <div style={localStyles.content}>
        <div style={localStyles.formContainer}>
          <Form />
        </div>
        <div style={localStyles.bannerContainer}>bbb</div>
      </div>
    </div>
  );
}

const localStyles = {
  container: {
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justufyContent: 'center',
  },
  content: {
      display: 'flex',
      backgroundColor: 'white',
      boxShadow: '0px 27px 28px -4px rgba(0,0,0,0.73)',
      width: '100%',
      margin: '5% 10%',
  },
  formContainer: {
      flex: '1',
      textAlign: 'center',
  },
  bannerContainer: {
      flex: '1',
      textAlign: 'center',
  },
}

export default App;
