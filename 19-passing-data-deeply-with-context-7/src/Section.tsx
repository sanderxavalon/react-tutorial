import { useContext } from 'react';
import { LevelContext } from './LevelContext';

export default function Section({ children, isFancy }: { children: React.ReactNode, isFancy?: boolean }) {
  const level = useContext(LevelContext);
  return (
    <section className={
      'section ' +
      (isFancy ? 'fancy' : '')
    }>
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}