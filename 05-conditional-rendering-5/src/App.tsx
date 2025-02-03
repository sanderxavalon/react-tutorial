function Message({ messageCount }: { messageCount: number }) {
  return (
    messageCount && <p>New messages</p>
  );
}

function App() {
  return (
    <section>
      <Message messageCount={10} />
      <Message messageCount={0} />
    </section>
  );
}

export default App;
