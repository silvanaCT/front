import React, { useState, useEffect } from 'react'
import locale from 'antd/es/date-picker/locale/pt_BR'
import {
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Checkbox,
    Button,
} from 'antd';

const { Option } = Select

const PesonalDataInputs = ({
    setFormValues,
    formValues,
    setStep,
}) => {
    const [inputValues, setInputValues] = useState({
        fullName: null,
        cpf: null,
        rg: null,
        intendedPosition: null,
        birthDate: null,
        civilState: null,
        sex: null,
    })
    const [errorMessages, setErrorMessages] = useState({
        fullName: null,
        cpf: null,
        rg: null,
        intendedPosition: null,
        birthDate: null,
        civilState: null,
        sex: null,
    })

    useEffect(() => {
        const {
            fullName,
            cpf,
            rg,
            intendedPosition,
            birthDate,
            civilState,
            sex,
        } = formValues

        setInputValues({
            fullName,
            cpf,
            rg,
            intendedPosition,
            birthDate,
            civilState,
            sex, 
        })
    }, [formValues, setInputValues])

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
                    value={value}
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

    const handleConfirm = () => {
        const errorObj = {
            fullName: null,
            cpf: null,
            rg: null,
            intendedPosition: null,
            birthDate: null,
            civilState: null,
            sex: null,
        }

        const {
            fullName,
            cpf,
            rg,
            intendedPosition,
            birthDate,
            civilState,
            sex,
        } = inputValues

        if (!fullName) errorObj.fullName = 'Campo obrigatório'
        if (fullName && fullName.split(' ').length < 2) errorObj.fullName = 'Digite seu nome e sobrenome'
        if (!cpf) errorObj.cpf = 'Campo obrigatório'
        if (cpf && cpf.length !== 11) errorObj.cpf = 'CPF inválido'
        if (!rg) errorObj.rg = 'Campo obrigatório'
        if (rg && (rg.length > 12 || rg.length < 7)) errorObj.rg = 'RG inválido'
        if (!intendedPosition) errorObj.intendedPosition = 'Campo obrigatório'
        if (!birthDate) errorObj.birthDate = 'Campo obrigatório'
        if (!civilState) errorObj.civilState = 'Campo obrigatório'
        if (!sex) errorObj.sex = 'Campo obrigatório'

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
            label: 'Nome completo',
            placeholder: 'Seu nome completo',
            stateName: 'fullName',
            value: inputValues.fullName || '',
            error: errorMessages.fullName,
            required: true
        },
        {
            label: 'CPF',
            placeholder: 'Apenas números',
            stateName: 'cpf',
            value: inputValues.cpf || '',
            error: errorMessages.cpf,
            required: true
        },
        {
            label: 'RG',
            placeholder: 'Apenas números',
            stateName: 'rg',
            value: inputValues.rg || '',
            error: errorMessages.rg,
            required: true
        },
        {
            label: 'Profissão',
            placeholder: 'Cargo desejado',
            stateName: 'intendedPosition',
            value: inputValues.intendedPosition || '',
            error: errorMessages.intendedPosition,
            required: true
        },
    ]

    return (
        <> 
            { inputVarMap.map((item, i) => inputLine({ ...item, key: i })) }
            <Row justify="space-between">

                <Col xs={24} xl={8}>
                    <div style={{ minWidth: '130px' }}>
                        <p style={localStyles.inputLabel}>Data de nascimento <span style={{ color: 'red' }}>*</span></p>
                        <br style={localStyles.br}/>
                        {
                            errorMessages.birthDate && (
                                <p style={localStyles.error}>{`${errorMessages.birthDate}`}</p>
                            )
                        }
                        <DatePicker
                            locale={locale}
                            value={inputValues.birthDate}
                            onChange={(date) => {
                                setErrorMessages((prevState) => ({ ...prevState, birthDate: null }))
                                setInputValues(
                                    (prevState) => ({ 
                                        ...prevState,
                                        birthDate: date 
                                    })
                                )
                            }}/>
                    </div>
                </Col>

                <Col xs={24} xl={7}>
                    <p style={localStyles.inputLabel}>Estado cívil <span style={{ color: 'red' }}>*</span></p>
                    <br style={localStyles.br}/>
                    {
                        errorMessages.civilState && (
                            <p style={localStyles.error}>{`${errorMessages.civilState}`}</p>
                        )
                    }
                    <Select 
                    style={{ width: 120 }} 
                    value={inputValues.civilState}
                    onChange={(value) => {
                        setErrorMessages((prevState) => ({ ...prevState, civilState: null }))
                        setInputValues(
                            (prevState) => ({ 
                                ...prevState,
                                civilState: value 
                            })
                        )
                    }}>
                        <Option value="solteiro">Solteiro</Option>
                        <Option value="casado">Casado</Option>
                        <Option value="divorciado">Divorciado</Option>
                        <Option value="separado">Separado</Option>
                        <Option value="viuvo">Viuvo</Option>
                    </Select>
                </Col>

                <Col xs={24} xl={7}>
                    <p style={localStyles.inputLabel}>Sexo <span style={{ color: 'red' }}>*</span></p>
                    <br style={localStyles.br}/>
                    {
                        errorMessages.sex && (
                            <p style={localStyles.error}>{`${errorMessages.sex}`}</p>
                        )
                    }
                    <Select 
                    style={{ width: 120 }} 
                    value={inputValues.sex}
                    onChange={(value) => {
                        setErrorMessages((prevState) => ({ ...prevState, sex: null }))
                        setInputValues(
                            (prevState) => ({ 
                                ...prevState,
                                sex: value 
                            })
                        )
                    }}>
                        <Option value="m">Masculino</Option>
                        <Option value="f">Feminino</Option>
                        <Option value="nao informado">Não informar</Option>
                    </Select>
                </Col>

            </Row>

            <Row>
                <Col xs={24}>
                    <div style={localStyles.checkboxContainer}>
                        <Checkbox
                        onChange={(e) => setInputValues(
                            (prevState) => ({ 
                                ...prevState,
                                hasDriversLicence: e.target.checked
                            })
                        )}>
                            Tenho carteira de motorista <span style={{ color: 'red' }}>*</span>
                        </Checkbox>
                    </div>
                </Col>

                <Col xs={24}>
                    <div style={localStyles.checkboxContainer}>
                        <Checkbox
                        onChange={(e) => setInputValues(
                            (prevState) => ({ 
                                ...prevState,
                                hasCar: e.target.checked
                            })
                        )}>
                            Tenho carro <span style={{ color: 'red' }}>*</span>
                        </Checkbox>
                    </div>
                </Col>
            </Row>

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
    checkboxContainer: {
        marginTop: '10px'
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

export default PesonalDataInputs
