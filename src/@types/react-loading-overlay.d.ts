declare module "react-loading-overlay" {
  declare const LoadingOverlay: (props: {
    active: boolean;
    text: string;
    spinner: boolean;
    children: JSX.Element;
  }) => JSX.Element;
  export default LoadingOverlay;
}
