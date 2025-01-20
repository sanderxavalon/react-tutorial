import { getImageUrl, Person } from './utils';

export default function Avatar({ person, size }: {person: Person, size: number}) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}