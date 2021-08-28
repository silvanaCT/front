import React, { useState } from 'react'

import PesonalDataInputs from './steps/PesonalDataInputs'
import AdressDataInputs from './steps/AdressDataInputs'
import ContactDataInputs from './steps/ContactDataInputs';

import useWindowDimensions from '../utils/useWindowDimensions';

import api from '../../api';

const Index = ({ setPageStep }) => {
    const [step, setStep] = useState(0)
    const [formValues, setFormValues] = useState({
        fullName: null,
        birthDate: null,
        sex: null,
        civilState: null,
        street: null,
        neighborhood: null,
        city: null,
        cep: null,
        state: null,
        number: null,
        telephone1: null,
        telephone2: null,
        cellphoneNumber: null,
        contactInfo: null,
        email: null,
        rg: null,
        cpf: null,
        hasCar: false,
        hasDriversLicence: false,
    })

    const { width } = useWindowDimensions();

    const handleSubmit = (input) => {
        const { birthDate } = input

        api.post('/candidate', {
            ...input,
            birthDate: birthDate.toString()
          })
          .then(() => {
            setPageStep((prevState) => prevState + 1)
          })
          .catch((err) => console.error("Erro: " + err))
    }

    const inputFieldsMap = {
        0: (
            <PesonalDataInputs 
                setFormValues={setFormValues} 
                formValues={formValues} 
                setStep={setStep}/>
        ),
        1: (
            <ContactDataInputs 
                setFormValues={setFormValues} 
                formValues={formValues} 
                setStep={setStep}/>
        ),
        2: (
            <AdressDataInputs 
                setFormValues={setFormValues} 
                formValues={formValues} 
                setStep={setStep}
                handleSubmit={handleSubmit}/>
        )
    }

    return (
        <>
            <h1 style={localStyles.title}>{title[step]}</h1>
            <div style={{ 
                ...localStyles.container,
                 padding: width < 340 || (width > 480 && width < 570) ? '35px 25px' : '35px 50px' 
                }}>
                {
                    (step > 0) && (
                        <p 
                        onClick={() => setStep(step - 1)}
                        style={localStyles.backButton}>{'<  Voltar'}</p>
                    )
                }
                <h3 style={localStyles.formTitle}>{formTitleMap[step]}</h3>
                {inputFieldsMap[step]}
            </div>
        </>
    )
}

const localStyles = {
    container: {
        padding: '35px 50px',
        background: '#FFFFFF',
        boxShadow: '10px 10px 25px rgba(221, 221, 221, 0.9)'
    },
    title: {
        color: '#37ADCA',
        fontSize: '35px',
        lineHeight: '45px',
        fontFamily: 'Righteous',
    },
    formTitle: {
        fontFamily: 'Righteous',
    },
    buttonContainer: {
        marginTop: '20px',
        textAlign: 'right'
    },
    backButton: {
        color: '#37ADCA',
        cursor: 'pointer',
    }
}

const formTitleMap = {
    0: 'Dados pessoais',
    1: 'Contato',
    2: 'Endereço'
}

const title = {
    0: <>Vamos começar então!<br />Preencha o formulário abaixo.</>,
    1: <>Queremos conversar com você!<br />Como podemos entrar em contato?</>,
    2: <>Só mais um pouquinho.<br />Precisamos saber onde mora.</>
}

export default Index
