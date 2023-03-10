import { ContactForm } from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import React, { Component } from 'react';
import {
  CommonWrapper,
  PhonebookWrapper,
  ContactsWrapper,
} from './Filter/App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const parseData = JSON.parse(localStorage.getItem('state'));
    parseData && this.setState({ contacts: parseData });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !==prevState.contact) {
      localStorage.setItem('state', JSON.stringify(this.state.contacts))
    }
    ;
  }

  addContact = contact => {
    const { contacts } = this.state;
    let isExist = [...contacts].filter(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (+isExist !== 0) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  handleDelete = deleteId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <CommonWrapper>
        <PhonebookWrapper>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={contact => this.addContact(contact)} />
        </PhonebookWrapper>

        <ContactsWrapper>
          <h2>Contacts</h2>
          <Filter handleChange={this.handleChange} filter={filter} />
          <ContactList
            contacts={filteredContacts}
            handleDelete={this.handleDelete}
          />
        </ContactsWrapper>
      </CommonWrapper>
    );
  }
}
