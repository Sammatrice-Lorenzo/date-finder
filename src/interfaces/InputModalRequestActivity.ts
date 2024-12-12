export interface InputModalRequestActivity {
  id: string;
  name: string;
  label: string;
  type: string;
  margin: "none" | "dense" | "normal";
  props?: {
    inputLabel: {
      shrink: boolean;
    }
  };
}