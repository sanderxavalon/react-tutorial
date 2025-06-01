import { useState } from 'react';
import Chat from './Chat';
import ContactList, { type Contact } from './ContactList';


export default function Messenger() {
  const [to, setTo] = useState<Contact>(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact: Contact) => setTo(contact)}
      />
      <Chat contact={to} />
    </div>
  )
}

const contacts: Contact[] = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
