import React, { Component } from 'react';
import {
  Toolbar,
  Grid,
  Cell,
  Card,
  CardTitle,
  CardText,
  TextField,
  SelectionControlGroup,
  SelectField,
  DatePicker,
  Button,
  Avatar,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  FontIcon,
  MenuButton,
  ListItem
} from 'react-md';
import update from 'react-addons-update';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state={
      cadastros: [],
      nome: null,
      sexo: null,
      estadoCivil: null,
      dataDeNascimento: null,
      observacoes: null
    }

    this.handleNome = this.handleNome.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNome(e) {
    this.setState({ nome: e });
  }

  handleSexo(e) {
    this.setState({ sexo: e });
  }

  handleEstadoCivil(e) {
    this.setState({ estadoCivil: e });
  }

  handleDataDeNasimento(e) {
    this.setState({ dataDeNascimento: e });
  }

  handleObservacoes(e) {
    this.setState({ observacoes: e });
  }

  handleSubmit(e) {
    e.preventDefault();

    let data={
      nome: this.state.nome,
      sexo: this.state.sexo,
      estadoCivil: this.state.estadoCivil,
      dataDeNascimento: this.state.dataDeNascimento,
      observacoes: this.state.observacoes,      
    };
    this.setState({ cadastros: update(this.state.cadastros, { $push: [data] }) });
  }

  delete(e) {
    let item = this.state.cadastros.findIndex(item => item.nome==e);
    this.setState({ cadastros: update(this.state.cadastros, { $splice: [[item, 1]] }) });
  }
  render() {
    return (
      <div className="App">
        <Toolbar
          title="Desafio Selenium"
          zDepth={1}
          colored
        />

        <Grid>
          <Cell desktopSize={4}>
            <Card>
              <CardTitle title="Formulário de cadastro" subtitle="Preencha os campos abaixo para realizar seu cadastro" />
              <CardText>
                <form id="formulario-cadastro" onSubmit={this.handleSubmit}>
                  <TextField
                    id="nome"
                    label="Nome completo"
                    lineDirection="center"
                    className="md-cell md-cell--bottom md-cell--12"
                    onChange={this.handleNome}
                    required                    
                  />
                  <SelectionControlGroup
                    id="sexo"
                    name="radio-example"
                    type="radio"
                    label="Sexo"
                    className="md-cell md-cell--bottom md-cell--12 sexo"
                    defaultValue="masculino"
                    value="masculino"
                    inline
                    onChange={this.handleSexo.bind(this)}
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
                    onChange={this.handleEstadoCivil.bind(this)}
                    placeholder="Estado civil"
                    className="md-cell md-cell--12"
                    menuItems={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
                    required                    
                  />
                  <DatePicker
                    id="data-nascimento"
                    onChange={this.handleDataDeNasimento.bind(this)}
                    label="Data de nascimento"
                    className="md-cell md-cell--bottom md-cell--12"
                    required                    
                  />
                  <TextField
                    id="observacoes"
                    onChange={this.handleObservacoes.bind(this)}
                    label="Observações"
                    lineDirection="center"
                    rows={10}
                    className="md-cell md-cell--bottom md-cell--12"
                    required
                  />
                  <Button id="cadastrar" raised primary type="submit">Cadastrar</Button>
                </form>
              </CardText>
            </Card>
          </Cell>
          <Cell desktopSize={8}>
            <Card>
              <CardTitle title="Lista de cadastros" />
              <CardText>
                <DataTable baseId="menu-table">
                  <TableHeader>
                    <TableRow>
                      <TableColumn>Nome</TableColumn>
                      <TableColumn>Sexo</TableColumn>
                      <TableColumn>Estado civil</TableColumn>
                      <TableColumn>Data de nascimento</TableColumn>
                      <TableColumn>Observações</TableColumn>
                      <TableColumn />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {this.state.cadastros.map(c => (
                      <TableRow key={c.nome}>
                        <TableColumn>{c.nome}</TableColumn>
                        <TableColumn>{c.sexo}</TableColumn>
                        <TableColumn>{c.estadoCivil}</TableColumn>
                        <TableColumn>{c.dataDeNascimento}</TableColumn>
                        <TableColumn>{c.observacoes}</TableColumn>
                        <TableColumn>
                          <MenuButton
                            id="menu-button-2"
                            icon
                            menuItems={[
                              <ListItem key={1}
                                leftIcon={<FontIcon>mode_edit</FontIcon>}
                                primaryText="Editar" />,
                              <ListItem key={2}
                                onClick={this.delete.bind(this, c.nome)}
                                leftIcon={<FontIcon>delete</FontIcon>}
                                primaryText="Deletar" />,
                            ]}
                            listInline
                            centered
                            anchor={{
                              x: MenuButton.HorizontalAnchors.CENTER,
                              y: MenuButton.VerticalAnchors.CENTER,
                            }}
                          >
                            more_vert
                          </MenuButton>
                        </TableColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </DataTable>
              </CardText>
            </Card>
          </Cell>
        </Grid>
      </div>
    );
  }
}

export default App;
