export type ButtonProps = {
  size: "small" | "normal"
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};
