import React, { useEffect, useState } from 'react'
import { Input, Row, Col, Button } from 'antd';

import api from '../../../api';

const AdressDataInputs = ({
    formValues,
    setFormValues,
    setStep,
    handleSubmit,
}) => {
    const [inputValues, setInputValues] = useState({
        street: null,
        neighborhood: null,
        city: null,
        cep: null,
        state: null,
        number: null,
    })
    const [calledCEP, setCalledCEP] = useState(null)
    const [errorMessages, setErrorMessages] = useState({
        street: null,
        neighborhood: null,
        city: null,
        cep: null,
        state: null,
        number: null,
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

    const inputVarMap = [
        {
            label: 'CEP',
            placeholder: 'Apenas números',
            stateName: 'cep',
            value: inputValues.cep || formValues.cep || '',
            error: errorMessages.cep
        },
        {
            label: 'Rua',
            placeholder: 'Nome da rua',
            stateName: 'street',
            value: inputValues.street || formValues.street || '',
            error: errorMessages.street
        },
        {
            label: 'Número',
            placeholder: 'Número da residencia',
            stateName: 'number',
            value: inputValues.number || formValues.number || '',
            error: errorMessages.number
        },
        {
            label: 'Bairro',
            placeholder: 'Nome do bairro',
            stateName: 'neighborhood',
            value: inputValues.neighborhood || formValues.neighborhood || '',
            error: errorMessages.neighborhood
        },
        {
            label: 'Cidade',
            placeholder: 'Nome da cidade',
            stateName: 'city',
            value: inputValues.city || formValues.city || '',
            error: errorMessages.city
        },
        {
            label: 'Estado',
            placeholder: 'Nome do estado',
            stateName: 'state',
            value: inputValues.state || formValues.state || '',
            error: errorMessages.state
        }
    ]

    useEffect(() => {
        const {
            cep
        } = inputValues

        if (cep && (cep.length === 8) && (cep !== calledCEP)) {
            api({
                method: 'get',
                url: `https://viacep.com.br/ws/${cep}/json/`
              })
              .then(({ data }) => {
                const {
                    bairro: neighborhood,
                    localidade: city,
                    logradouro: street,
                    uf: state,
                } = data

                setCalledCEP(cep)
                setErrorMessages({})
                setInputValues((prevState) => ({ 
                    ...prevState,
                    neighborhood,
                    city,
                    street,
                    state
                }))
              }).catch((err) => console.error("Erro: " + err));
        }
    }, [inputValues, setFormValues, setCalledCEP, calledCEP])

    const handleConfirm = () => {
        const errorObj = {
            street: null,
            neighborhood: null,
            city: null,
            cep: null,
            state: null,
            number: null,
        }

        const {
            street,
            neighborhood,
            city,
            cep,
            state,
            number,
        } = inputValues

        if (!street) errorObj.street = 'Campo obrigatório'
        if (!neighborhood) errorObj.neighborhood = 'Campo obrigatório'
        if (!city) errorObj.city = 'Campo obrigatório'
        if (!cep) errorObj.cep = 'Campo obrigatório'
        if (cep && cep.length !== 8) errorObj.cep = 'CEP deve possuir 8 digitos'
        if (!state) errorObj.state = 'Campo obrigatório'
        if (!number) errorObj.number = 'Campo obrigatório'

        setErrorMessages({ ...errorObj })

        if (isAllowed(Object.entries(errorObj))) {
            setFormValues((prevState) => {
                handleSubmit({ ...prevState, adress: { ...inputValues } })
                return { ...prevState, adress: { ...inputValues } }
            })
        }
    }

    const isAllowed = (array) => {
        for (let i = 0; i < array.length; i++) {
            const [,value] = array[i]
            if (value) return false
        }
        return true
    }

    return (
        <> 
            { inputVarMap.map((item, i) => inputLine({ ...item, key: i })) }
            <Row>
                <Col xs={24}>
                    <div style={localStyles.buttonContainer}>
                        <Button
                        onClick={() => handleConfirm()}
                        type="primary">
                            Enviar
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

export default AdressDataInputs
