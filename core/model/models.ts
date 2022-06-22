import { useCounterStore } from '../../schala-gui/src/stores/example-store';
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Profile {
  id: number;
  name: string;
  affiliation: string;
  totalCitations: number;
  
}

