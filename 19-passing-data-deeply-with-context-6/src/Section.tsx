import { useContext } from 'react';
import { LevelContext } from './LevelContext';

export default function Section({ children }: { children: React.ReactNode }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
