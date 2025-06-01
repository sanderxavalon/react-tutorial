export interface Contact {
  id: number;
  name: string;
  email: string;
}

interface ContactListProps {
  selectedContact: Contact;
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}

export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}: ContactListProps) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map(contact =>
          <li key={contact.id}>
            <button onClick={() => {
              onSelect(contact);
            }}>
              {contact.name}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
