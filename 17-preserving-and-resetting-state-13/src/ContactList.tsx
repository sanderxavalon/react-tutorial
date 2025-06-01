export interface Contact {
  id: number;
  name: string;
  email: string;
}

export default function ContactList({
  selectedContact,
  contacts,
  onSelect
}: {
  selectedContact: Contact;
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
}) {
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
