import React from 'react'
import locale from 'antd/es/date-picker/locale/pt_BR'
import { Input, Row, Col, DatePicker } from 'antd';

const AdressDataInputs = ({
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
        label: 'Rua',
        placeholder: 'Nome da rua',
        stateName: 'street'
    },
    {
        label: 'Número',
        placeholder: 'Número da residencia',
        stateName: 'number'
    },
    {
        label: 'Bairro',
        placeholder: 'Nome do bairro',
        stateName: 'neighborhood'
    },
    {
        label: 'Cidade',
        placeholder: 'Nome da cidade',
        stateName: 'city'
    },
    {
        label: 'CEP',
        placeholder: '99999999 (apenas números)',
        stateName: 'cep'
    },
    {
        label: 'Estado',
        placeholder: 'Nome do estado',
        stateName: 'state'
    },
]

export default AdressDataInputs
