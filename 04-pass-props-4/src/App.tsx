import Avatar from "./Avatar";
import './App.css'

function Card({ children } : { children : React.ReactNode }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}

export default App
