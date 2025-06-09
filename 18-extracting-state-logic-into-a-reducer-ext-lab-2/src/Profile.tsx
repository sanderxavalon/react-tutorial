import Panel from './Panel.js';
import { getImageUrl } from './utils.js';

let currentPerson: Person;

export interface Person {
  imageId: string;
  name: string;
}

export default function Profile({ person }: { person: Person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  )
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
