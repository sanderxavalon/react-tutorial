interface Story {
    id: string | number;
    label: string;
}

export default function StoryTray({ stories }: { stories: Story[] }) {
    stories.push({
      id: 'create',
      label: 'Create Story'
    });
  
    return (
      <ul>
        {stories.map(story => (
          <li key={story.id}>
            {story.label}
          </li>
        ))}
      </ul>
    );
  }
  