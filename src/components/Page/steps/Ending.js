import React from 'react'
import { Row, Col, Button } from 'antd'

const Ending = ({
    setPageStep
}) => (
    <Row>
        <Col lg={24}>
            <div>
                <h1 style={localStyles.title}>
                    Cadastro concluído!
                </h1>

                <h2 style={localStyles.subTitle}>Agradeçemos o interesse pela vaga!</h2>
                
                <p>Preste bastante atenção aos seus emails, em breve você terá notícias nossas!</p>

                <p>Fique tranquilo, seu email será usado somente para contato.</p>

                <div style={localStyles.buttonContainer}>
                    <Button 
                        onClick={() => setPageStep(0)}
                        type='primary'
                        size='large'>
                        Voltar ao ínicio
                    </Button>
                </div>
            </div>
        </Col>
    </Row>
)

const localStyles = {
    title: {
        color: '#37ADCA',
        fontSize: '35px',
        lineHeight: '45px',
        fontFamily: 'Righteous',
    },
    subTitle: {
        fontFamily: 'Righteous',
        color: '#505050'
    },
    buttonContainer: {
        marginTop: '40px'
    }
}

export default Ending