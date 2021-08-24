import React, { useState } from 'react'
import { Input, Button } from 'antd';

import PersonalInput from './inputGroups/PersonalInput';
import AdressInput from './inputGroups/AdressInput'
import ContactInput from './inputGroups/ContactInput';
import PositionInput from './inputGroups/PositionInput'

const Form = () => {
    const [step, setStep] = useState(0)
    const [personalData, setPersonalData] = useState({
        fullName: null,
        intendedPosition: null,
        birthDay: null,
        civilState: null,
        sex: null,
        adress: null,
        neighborhood: null,
        city: null,
        cep: null,
        phoneNumber1: null,
        phoneNumber2: null,
        cellNumber: null,
        contact: null,
        email: null,
    })
    const [documentData, setDocumentData] = useState({
        rg: null,
        cpf: null,
        hasCar: null,
        hasDriverLicense: null,
    })

    return (
        <div style={localStyles.container}>

            <h1 style={localStyles.title}>{title[step]}</h1>

            <div>{content[step]}</div>

            <div style={localStyles.buttonContainer}>
                <Button
                    onClick={() => {
                        if (step < 3) setStep(step + 1)
                    }}
                    type="primary">
                    { step < 3 ? 'Próximo' : 'Enviar' }
                </Button>
            </div>

        </div>
    )
}

const localStyles = {
    container: {
        padding: '80px 20px 80px 20px'
    },
    inputLabel: {
        marginBottom: '2px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    line: {
        textAlign: 'left',
        display: 'flex',
        width: '100%'
    },
    inputContainer: {
        margin: '0 5px',
    },
    title: {
        textAlign: 'left'
    },
    input: {
        outline: 'none',
    },
    buttonContainer: {
        textAlign: 'right',
        margin: '10px 0 0 0'
    }
}

const title = {
    0: 'Informações pessoais',
    1: 'Endereço',
    2: 'Contato',
    3: 'Cargo'
}

const content = {
    0: <PersonalInput />,
    1: <AdressInput />,
    2: <ContactInput />,
    3: <PositionInput />
}

export default Form
