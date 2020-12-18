export interface InterfaceMapTable {
  id: number;
  name: string; // Совпадения с названием
  type: MapTableType;
  text?: string;
  object?: InterfaceMapTable[];
}
type MapTableType = 'string' | 'bool' | 'img' | 'object';
