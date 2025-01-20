import { getImageUrl, Person } from "./utils";

export default function Avatar(props: { person: Person; size: number }) {
  const person = props.person;
  const size = props.size;
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
