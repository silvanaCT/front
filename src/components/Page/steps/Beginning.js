import React from 'react'
import { Row, Col, Button } from 'antd'

const Beginning = ({
    setPageStep
}) => (
    <Row>
        <Col lg={24}>
            <div>
                <h1 style={localStyles.title}>
                    Desenvolvedores full-stack
                    <br />
                    React e Node.js
                </h1>

                <p>
                    Quer fazer parte da nossa equipe?
                    nós estamos crescendo a procura de uma pessoa 
                    para compor o nosso time como um Desenvolvedor!
                </p>

                <p>
                    Aqui você ira trabalhar com uma equipe qualificada, engajada
                    e ágil. além do mais, terá contato com equipes multidisciplinares em
                    um ambiente altamente colaborativo.
                </p>

                <h2 style={localStyles.subTitle}>O que irá fazer?</h2>
                
                <ul>
                    <li>Desenvolver e realizar manutenção nas aplicações mobile e web;</li>
                    <li>Realizar a manutenção e criação de novas funcionalidades no Front-End e Back-End;</li>
                    <li>Aprender a desenvolver como profissional;</li>
                    <li>Atuar em equipes horizontais e multidisciplinares;</li>
                </ul>

                <div style={localStyles.buttonContainer}>
                    <Button 
                        onClick={() => setPageStep(1)}
                        type='primary'
                        size='large'>
                        Quero me candidatar!
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

export default Beginning