import { LevelContext } from './LevelContext';

export default function Section({ level, children }: { level: number, children: React.ReactNode }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
