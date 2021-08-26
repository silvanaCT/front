import React from 'react'
import useWindowDimensions from './components/utils/useWindowDimensions'

import Page from './components/Page'

const App = () => {
  const { width } = useWindowDimensions();

  const localStyles = {
    container: {
      margin: `0 ${width < 480 ? '10px' : '100px'}`,
    },
    header: {
      padding: `0 ${width < 480 ? '20px' : '160px'}`,
      backgroundColor: '#F8F8F8',
      marginBottom: '70px',
      ...(width < 480 && { textAlign: 'center' })
    },
    imgContainer: {
      width: '200px',
      padding: '20px 0'
    }
  }

  return (
    <>
      <div style={localStyles.header}>
        <div style={localStyles.imgContainer}>
          <img src={'logo.png'} style={{ height: 'auto', width: '100%' }} alt="Logo"/>
        </div>
      </div>
      <div style={localStyles.container}>
          <Page />
      </div>
    </>
  );
}

export default App;
