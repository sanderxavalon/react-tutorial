import { getImageUrl } from './utils'
import './App.css'

interface ProfileProps {
  name: string,
  imageId: string,
  profession: string,
  awardCount: number,
  award: string,
  discovered: string
}

function Profile(props: ProfileProps) {
  return (
    <section className="profile">
    <h2>props.name</h2>
    <img
      className="avatar"
      src={getImageUrl(props.imageId)}
      alt={props.name}
      width={70}
      height={70}
    />
    <ul>
      <li>
        <b>Profession: </b> 
        {props.profession}
      </li>
      <li>
        <b>Awards: {props.awardCount} </b> 
        {props.award}
      </li>
      <li>
        <b>Discovered: </b>
        {props.discovered}
      </li>
    </ul>
  </section>
  )
}

export default function App() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile 
        name={'Maria Skłodowska-Curie'}
        imageId={'szV5sdG'}
        profession={'physicist and chemist'}
        awardCount={4}
        award={'(Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)'}
        discovered={'polonium (chemical element)'}
      />
      <Profile 
        name={'Katsuko Saruhashi'}
        imageId={'YfeOqp2'}
        profession={'geochemist'}
        awardCount={2}
        award={'(Miyake Prize for geochemistry, Tanaka Prize)'}
        discovered={'a method for measuring carbon dioxide in seawater'}
      />
    </div>
  );
}
