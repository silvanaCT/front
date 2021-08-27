import React from 'react'
import { Input, Row, Col } from 'antd';

const ContactDataInputs = ({
    setFormValues,
}) => {
    const inputLine = ({
        label,
        placeholder,
        stateName,
        key,
    }) => (
        <div key={key}>
            <Row>
                <Col xs={24}>
                    <p style={localStyles.inputLabel}>{label}</p>
                    <br style={localStyles.br}/>
                    <Input
                    placeholder={placeholder}
                    onChange={(e) => setFormValues(
                        (prevState) => ({ 
                            ...prevState,
                            [stateName]: e.target.value 
                        })
                    )}/>
                </Col>
            </Row>
        </div>
    )



    return (
        <> 
            { inputVarMap.map((item, i) => inputLine({ ...item, key: i })) }
        </>
    )
}

const localStyles = {
    container: {
        padding: '20px',
        backgroundColor: 'rgb(225 223 255)',
        boxShadow: '0px 5px 5px -2px rgba(0,0,0,0.73)',
    },
    inputLabel: {
        margin: '10px 0 0 0'
    },
    br: {
        display: 'none'
    }
}

const inputVarMap = [
    {
        label: 'Celular',
        placeholder: '99928282828',
        stateName: 'cellphoneNumber'
    },
    {
        label: 'Telefone fixo',
        placeholder: '09872736',
        stateName: 'telephone1'
    },
    {
        label: 'Telefone fixo secundário',
        placeholder: '09872736',
        stateName: 'telephone2'
    },
    {
        label: 'Informações adicionais para contato',
        placeholder: 'Telefone da mãe, pai, etc',
        stateName: 'contactInfo'
    },
    {
        label: 'Email',
        placeholder: 'seuemail@email.com',
        stateName: 'email'
    },
]

export default ContactDataInputs
