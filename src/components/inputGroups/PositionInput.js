import React from 'react'
import { Input } from 'antd';

const ContactInput = () => (
    <div style={localStyles.container}>

        <div style={localStyles.line}>
            <div style={localStyles.inputContainer}>
                <p style={localStyles.inputLabel}>
                    Cargo
                </p>
                <Input
                style={localStyles.input}/>
            </div>
        </div>

    </div>
)

const localStyles = {
    container: {
        padding: '20px',
        backgroundColor: 'rgb(225 223 255)',
        boxShadow: '0px 5px 5px -2px rgba(0,0,0,0.73)',
    },
    inputLabel: {
        margin: '8px 2px',
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
    input: {
        outline: 'none',
        
    }
}

export default ContactInput
