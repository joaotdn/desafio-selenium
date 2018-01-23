import React, { Component } from 'react';
import {
    Cell,
    Card,
    CardTitle,
    CardText,
    TextField,
    SelectionControlGroup,
    SelectField,
    DatePicker,
    Button
} from 'react-md';
import PropTypes from 'prop-types';

class SubscriptionForm extends Component {
    render() { 
        return (
            <div>
                <TextField
                    id="nome"
                    label="Nome completo"
                    lineDirection="center"
                    className="md-cell md-cell--bottom md-cell--12"
                    name="nome"
                    required                    
                />
                <SelectionControlGroup
                    id="sexo"
                    name="radio-example"
                    type="radio"
                    label="Sexo"
                    className="md-cell md-cell--bottom md-cell--12 sexo"
                    defaultValue="masculino"
                    name="sexo"
                    inline
                    controls={[{
                    label: 'Masculino',
                    value: 'masculino',
                    }, {
                    label: 'Feminino',
                    value: 'feminino',
                    }]}
                    required                    
                />
                <SelectField
                    id="estado-civil"
                    name="estadoCivil"
                    placeholder="Estado civil"
                    className="md-cell md-cell--12"
                    menuItems={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
                    required                    
                />
                <DatePicker
                    id="data-nascimento"
                    name="dataDeNascimento"
                    label="Data de nascimento"
                    className="md-cell md-cell--bottom md-cell--12"
                    portal
                    lastChild
                    renderNode={null}
                    disableScrollLocking
                    required                    
                />
                <TextField
                    id="observacoes"
                    name="observacoes"
                    label="Observações"
                    lineDirection="center"
                    rows={10}
                    className="md-cell md-cell--bottom md-cell--12"
                    required
                />
          </div>
        )
    }
}
 
export default SubscriptionForm;