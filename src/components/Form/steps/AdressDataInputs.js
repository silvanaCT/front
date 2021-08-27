import React, { useEffect } from 'react'
import { Input, Row, Col } from 'antd';

import api from '../../../api';

const AdressDataInputs = ({
    setFormValues,
    formValues,
}) => {
    const {
        city,
        neighborhood,
        cep,
        state,
        street,
    } = formValues

    const inputLine = ({
        label,
        placeholder,
        stateName,
        value,
        key,
    }) => (
        <div key={key}>
            <Row>
                <Col xs={24}>
                    <p style={localStyles.inputLabel}>{label}</p>
                    <br style={localStyles.br}/>
                    <Input
                    placeholder={placeholder}
                    value={value && value}
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

    const inputVarMap = [
        {
            label: 'Rua',
            placeholder: 'Nome da rua',
            stateName: 'street',
            value: street
        },
        {
            label: 'Número',
            placeholder: 'Número da residencia',
            stateName: 'number'
        },
        {
            label: 'Bairro',
            placeholder: 'Nome do bairro',
            stateName: 'neighborhood',
            value: neighborhood
        },
        {
            label: 'Cidade',
            placeholder: 'Nome da cidade',
            stateName: 'city',
            value: city
        },
        {
            label: 'CEP',
            placeholder: '99999999 (apenas números)',
            stateName: 'cep',
            value: cep
        },
        {
            label: 'Estado',
            placeholder: 'Nome do estado',
            stateName: 'state',
            value: state
        },
    ]

    useEffect(() => {
        const {
            cep
        } = formValues

        if (cep && (cep.length === 8)) {
            api({
                method: 'get',
                url: `https://viacep.com.br/ws/${cep}/json/`
              })
              .then(({ data }) => {
                const {
                    bairro: neighborhood,
                    cep,
                    localidade: city,
                    logradouro: street,
                    uf: state,
                } = data

                setFormValues((prevState) => ({ 
                    ...prevState,
                    neighborhood,
                    cep,
                    city,
                    street,
                    state
                }))
              }).catch((err) => console.error("Erro: " + err));
        }
    }, [formValues])

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

export default AdressDataInputs
