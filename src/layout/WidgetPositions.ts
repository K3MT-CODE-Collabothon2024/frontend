interface Widget {
    id: string;            // Unique identifier for the widget
    width: number;         // Width of the widget (in grid units)
    height: number;        // Height of the widget (in grid units)
    startPosition: number; // Starting position in the grid (1-based index)
  }
  
  const WidgetPositions: Record<number, Widget> = {
    0: { id: "TestComponent", width: 2, height: 2, startPosition: 1 },
    1: { id: "TestComponentCompressed", width: 1, height: 2, startPosition: 5 },
    2: { id: "TestBigComponent", width: 2, height: 4, startPosition: 3 },
    3: { id: "AddWidget", width: 1, height: 2, startPosition: 6 },
  };
  
  export default WidgetPositions;
  