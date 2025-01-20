export default function Clock({ color, time }: {color: string, time: string}) {
    return (
      <h1 style={{ color: color }}>
        {time}
      </h1>
    );
  }
  