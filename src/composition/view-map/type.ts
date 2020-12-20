export interface InterfaceMapView {
  id: number;
  name: string; // Совпадения с названием
  type: MapTableType;
  text?: string;
  object?: InterfaceMapView[];
}
type MapTableType =
  | 'inputString'
  | 'checkbox'
  | 'img'
  | 'object'
  | 'select'
  | 'radio'
  | 'text';
