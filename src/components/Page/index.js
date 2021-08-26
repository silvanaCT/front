import React, { useState } from 'react'
import { Row, Col } from 'antd'

import Beginning from './steps/Beginning'
import Ending from './steps/Ending'
import Form from '../Form'

const Index = () => {
    const [pageStep, setPageStep] = useState(0)

    const pageStepMap = {
        0: <Beginning setPageStep={setPageStep}/>,
        1: <Form setPageStep={setPageStep}/>,
        2: <Ending setPageStep={setPageStep}/>
    }

    return (
        <Row justify="center">
            <Col lg={11}>
                <div style={{ marginBottom: '50px' }}>
                    {
                        (pageStep > 0 && pageStep !== 2) && (
                            <p 
                            onClick={() => setPageStep(0)}
                            style={localStyles.backButton}>{'<  Voltar ao início'}</p>
                        )
                    }
                    {pageStepMap[pageStep]}
                </div>
            </Col>
            <Col lg={12} offset={1}>
                <div style={localStyles.imgContainer}>
                    <img 
                        src={pageStep !== 2 ? 'img1.svg' : 'img2.svg'}
                        style={localStyles.img}
                        alt="Menina"/>
                </div>
            </Col>
        </Row>
    )
}

const localStyles = {
    img: {
        marginTop: '60px',
        width: '100%',
        height: 'auto',
    },
    backButton: {
        color: '#37ADCA',
        cursor: 'pointer',
    }
}

export default Index