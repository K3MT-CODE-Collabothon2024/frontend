import WidgetPositionsData from './widgetPositions.json';

interface Widget {
  content: string;
  popup: string;            // Unique identifier for the widget
  width: number;         // Width of the widget (in grid units)
  height: number;        // Height of the widget (in grid units)
  startPosition: number; // Starting position in the grid (1-based index)
}

const WidgetPositions: Record<number, Widget> = WidgetPositionsData;

export default WidgetPositions;