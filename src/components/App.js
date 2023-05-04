import { useState, useEffect, useRef } from 'react';
import { ContactForm } from './Form/Form';
import { ContactsList } from './Contacts/Contacts.list';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import InitialContact from './InitialContacts.json';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(InitialContact);
    }
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = newContacts => {
    const newContactsLowercase = newContacts.name.toLowerCase();
    const findContact = contacts.find(
      contact => contact.name.toLowerCase() === newContactsLowercase
    );
    if (findContact) {
      return alert(`${newContacts.name} is already in contacts.`);
    } else {
      setContacts(prevState => [...prevState, newContacts]);
    }
  };

  const changeFilterValue = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const toLowerCaseFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(toLowerCaseFilter)
    );
    return filterContacts;
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Layout>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <ContactForm addContacts={addContacts} />
      <h2>Contacts</h2>
      <Filter changeFilter={changeFilterValue} filter={filter} />
      <ContactsList options={filterContacts()} onDelete={deleteContact} />
    </Layout>
  );
};
