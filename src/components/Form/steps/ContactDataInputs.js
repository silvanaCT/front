import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Button } from 'antd';

const ContactDataInputs = ({
    setFormValues,
    formValues,
    setStep,
}) => {
    const [inputValues, setInputValues] = useState({
        cellphoneNumber: null,
        telephone1: null,
        telephone2: null,
        contactInfo: null,
        email: null,
    })
    const [errorMessages, setErrorMessages] = useState({
        cellphoneNumber: null,
        telephone1: null,
        telephone2: null,
        email: null,
    })

    const inputLine = ({
        label,
        placeholder,
        stateName,
        value,
        error,
        required,
        key,
    }) => (
        <div key={key}>
            <Row>
                <Col xs={24}>
                    <p style={localStyles.inputLabel}>
                        {label}
                        {required && <span style={{ color: 'red' }}> *</span>}
                    </p>
                    <br style={localStyles.br}/>
                    {
                        error && (
                            <p style={localStyles.error}>{`${error}`}</p>
                        )
                    }
                    <Input
                    placeholder={placeholder}
                    value={value && value}
                    onChange={(e) => {
                        setErrorMessages((prevState) => ({ ...prevState, [stateName]: null }))
                        setInputValues(
                            (prevState) => ({ 
                                ...prevState,
                                [stateName]: e.target.value 
                            }))
                    }}/>
                </Col>
            </Row>
        </div>
    )

    useEffect(() => {
        const {
            cellphoneNumber,
            telephone1,
            telephone2,
            contactInfo,
            email,
        } = formValues

        setInputValues({
            cellphoneNumber,
            telephone1,
            telephone2,
            contactInfo,
            email,
        })
    }, [formValues, setInputValues])

    const handleConfirm = () => {
        const errorObj = {
            cellphoneNumber: null,
            telephone1: null,
            telephone2: null,
            email: null,
        }

        const {
            cellphoneNumber,
            telephone1,
            telephone2,
            email,
        } = inputValues

        if (!cellphoneNumber) errorObj.cellphoneNumber = 'Campo obrigatório'
        if (cellphoneNumber && cellphoneNumber.length < 10) errorObj.cellphoneNumber = 'Celular deve possuir pelo menos 10 digitos'
        if (!telephone1) errorObj.telephone1 = 'Campo obrigatório'
        if (telephone1 && telephone1.length < 10) errorObj.telephone1 = 'Telefone deve conter pelo menos 10 digitos'
        if (telephone2 && telephone2.length < 10) errorObj.telephone2 = 'Telefone deve conter pelo menos 10 digitos'
        if (!email) errorObj.email = 'Campo obrigatório'

        setErrorMessages({ ...errorObj })

        if (isAllowed(Object.entries(errorObj))) {
            setFormValues((prevState) => ({ ...prevState, ...inputValues }))
            setStep((prevState) => prevState + 1)
        }
    }

    const isAllowed = (array) => {
        for (let i = 0; i < array.length; i++) {
            const [,value] = array[i]
            if (value) return false
        }
        return true
    }

    const inputVarMap = [
        {
            label: 'Celular',
            placeholder: '99928282828',
            stateName: 'cellphoneNumber',
            value: inputValues.cellphoneNumber,
            error: errorMessages.cellphoneNumber,
            required: true
        },
        {
            label: 'Telefone fixo',
            placeholder: '0987273625',
            stateName: 'telephone1',
            value: inputValues.telephone1,
            error: errorMessages.telephone1,
            required: true
        },
        {
            label: 'Telefone fixo secundário',
            placeholder: '0987273632',
            stateName: 'telephone2',
            value: inputValues.telephone2,
            error: errorMessages.telephone2,
            required: false
        },
        {
            label: 'Informações adicionais para contato',
            placeholder: 'Telefone da mãe, pai, etc',
            stateName: 'contactInfo',
            value: inputValues.contactInfo,
            required: false
        },
        {
            label: 'Email',
            placeholder: 'seuemail@email.com',
            stateName: 'email',
            value: inputValues.email,
            error: errorMessages.email,
            required: true
        },
    ]

    return (
        <> 
            { inputVarMap.map((item, i) => inputLine({ ...item, key: i })) }
            <Row>
                <Col xs={24}>
                    <div style={localStyles.buttonContainer}>
                        <Button
                        onClick={() => handleConfirm()}
                        type="primary">
                            Próximo
                        </Button>
                    </div>
                </Col>
            </Row>
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
    },
    error: {
        color: 'red',
        margin: '0',
    },
    buttonContainer: {
        marginTop: '20px',
        textAlign: 'right'
    },
}

export default ContactDataInputs
