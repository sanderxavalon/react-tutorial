import { useState } from 'react';
import { initialTravelPlan } from './places';

interface Place {
  id: number;
  title: string;
  childIds: number[];
}

interface PlacesById {
  [key: number]: Place;
}

export default function TravelPlan() {
  const [plan, setPlan] = useState<PlacesById>(initialTravelPlan);

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId];
    // 創建一個新的父節點版本
    // 不包含這個子節點 ID
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // 更新根狀態物件...
    setPlan({
      ...plan,
      // ...使其包含更新後的父節點
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>旅遊目的地</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ 
  id, 
  parentId, 
  placesById, 
  onComplete 
}: { 
  id: number; 
  parentId: number; 
  placesById: PlacesById; 
  onComplete: (parentId: number, childId: number) => void;
}) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        完成
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
