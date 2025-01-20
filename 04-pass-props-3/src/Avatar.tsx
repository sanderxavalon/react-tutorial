import { getImageUrl, Person } from "./utils";

export default function Avatar({person, size = 100}: { person: Person; size?: number }) {
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
