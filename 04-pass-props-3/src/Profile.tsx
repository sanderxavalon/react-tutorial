import Avatar from "./Avatar";
import { Person } from "./utils";


export default function Profile(props: { person: Person; size?: number }) {
    return (
      <div>
        <Avatar {...props} />
      </div>
    );
  }