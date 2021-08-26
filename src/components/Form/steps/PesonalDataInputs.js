import React from 'react'
import locale from 'antd/es/date-picker/locale/pt_BR'
import {
    Input,
    Row,
    Col,
    DatePicker,
    Select,
    Checkbox
} from 'antd';

const { Option } = Select

const PesonalDataInputs = ({
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

            <Row justify="space-between">

                <Col xs={24} xl={8}>
                    <div style={{ minWidth: '130px' }}>
                        <p style={localStyles.inputLabel}>Data de nascimento</p>
                        <br style={localStyles.br}/>
                        <DatePicker
                            locale={locale}
                            onChange={(date) => setFormValues(
                                (prevState) => ({ 
                                    ...prevState,
                                    birthDate: date.toString() 
                                })
                            )}/>
                    </div>
                </Col>

                <Col xs={24} xl={7}>
                    <p style={localStyles.inputLabel}>Estado cívil</p>
                    <br style={localStyles.br}/>
                    <Select 
                    style={{ width: 120 }} 
                    onChange={(value) => setFormValues(
                        (prevState) => ({ 
                            ...prevState,
                            civilState: value
                        })
                    )}>
                        <Option value="solteiro">Solteiro</Option>
                        <Option value="casado">Casado</Option>
                        <Option value="divorciado">Divorciado</Option>
                        <Option value="separado">Separado</Option>
                        <Option value="viuvo">Viuvo</Option>
                    </Select>
                </Col>

                <Col xs={24} xl={7}>
                    <p style={localStyles.inputLabel}>Sexo</p>
                    <br style={localStyles.br}/>
                    <Select 
                    style={{ width: 120 }} 
                    onChange={(value) => setFormValues(
                        (prevState) => ({ 
                            ...prevState,
                            sex: value
                        })
                    )}>
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
                        onChange={(e) => setFormValues(
                            (prevState) => ({ 
                                ...prevState,
                                hasDriversLicence: e.target.checked
                            })
                        )}>
                            Tenho carteira de motorista
                        </Checkbox>
                    </div>
                </Col>

                <Col xs={24}>
                    <div style={localStyles.checkboxContainer}>
                        <Checkbox
                        onChange={(e) => setFormValues(
                            (prevState) => ({ 
                                ...prevState,
                                hasCar: e.target.checked
                            })
                        )}>
                            Tenho carro
                        </Checkbox>
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
    }
}

const inputVarMap = [
    {
        label: 'Nome completo',
        placeholder: 'Seu nome completo',
        stateName: 'fullName'
    },
    {
        label: 'CPF',
        placeholder: '999.999.999.99',
        stateName: 'cpf'
    },
    {
        label: 'RG',
        placeholder: '20.475.719-8',
        stateName: 'rg'
    },
    {
        label: 'Profissão',
        placeholder: 'Cargo desejado',
        stateName: 'intendedPosition'
    },
]

export default PesonalDataInputs
