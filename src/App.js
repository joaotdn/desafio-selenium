import React, { Component } from 'react';
import serialize from 'form-serialize';
import SubscriptionForm from './components/SubscriptionForm';
import {
  Toolbar,
  Grid,
  Cell,
  Card,
  CardTitle,
  CardText,
  Avatar,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  FontIcon,
  MenuButton,
  ListItem,
  DialogContainer,
  Button,
  Portal,
  Snackbar 
} from 'react-md';
import update from 'react-addons-update';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state={
      visible: false,
      toasts: [],
      autohide: true,
      cadastros: [
        {
          id: 1,
          nome: 'João Teodooro',
          sexo: 'masculino',
          estadoCivil: 'Solteiro',
          dataDeNascimento: '27/01/1986',
          observacoes: 'Sustentação - Fábrica - JP'
        }, {
          id: 2,
          nome: 'Alex Brenner',
          sexo: 'masculino',
          estadoCivil: 'Casado',
          dataDeNascimento: '07/11/1989',
          observacoes: 'CG'
        }
      ]
    }

    this.show = () => { this.setState({ visible: true }) };
    this.hide = () => { this.setState({ visible: false }) };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addToast = (text, action, autohide = true) => {
    this.setState((state) => {
      const toasts = state.toasts.slice();
      toasts.push({ text, action });
      return { toasts, autohide };
    });
  };

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  handleSubmit(e) {
    e.preventDefault();
    let form = document.querySelector('#formulario-cadastro');
    let cadastro = serialize(form, { hash: true });
    this.setState({ 
      cadastros: update(this.state.cadastros, { $push: [cadastro] }),
      visible: false
    });
    this.addToast('Cadastro adicionado!');
  }

  delete(e) {
    let item = this.state.cadastros.findIndex(item => item.nome==e);
    this.setState({ cadastros: update(this.state.cadastros, { $splice: [[item, 1]] }) });
    this.addToast('Cadastro deletado!');
  }
  render() {
    const { visible, toasts, autohide } = this.state;
    const actions = [];

    actions.push({ secondary: true, children: 'Cancelar', onClick: this.hide });
    actions.push(<Button id="cadastrar" raised primary onClick={this.handleSubmit}>Cadastrar</Button>);

    return (
      <div className="App">
        <Toolbar
          title="Desafio Selenium"
          zDepth={1}
          colored
        />
        <Grid>
          <Cell desktopSize={10} desktopOffset={1}>
            <Card>
              <CardTitle title="Lista de cadastros" />
              <CardText>
                <DataTable baseId="menu-table">
                  <TableHeader>
                    <TableRow>
                      <TableColumn>Nome</TableColumn>
                      <TableColumn>Sexo</TableColumn>
                      <TableColumn>Estado civil</TableColumn>
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

        <Button
          id="adicionar"
          floating
          fixed
          fixedPosition='br'
          onClick={this.show}
          primary>add</Button>

        <DialogContainer
          id="janela"
          visible={visible}
          onHide={this.hide}
          title="Formulário de cadastro"
          actions={actions}
          width={400}
        >
          <form id="formulario-cadastro">
            <SubscriptionForm />
          </form>
        </DialogContainer>
        
        <Snackbar
          id="alertas"
          toasts={toasts}
          autohide={autohide}
          onDismiss={this.dismissToast}
        />
      </div>
    );
  }
}

export default App;
