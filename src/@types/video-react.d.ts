declare module "video-react" {
  export const Player: (props: {
    fluid: boolean;
    width: number;
    height: number;
    children: JSX.Element[];
  }) => JSX.Element;

  export const BigPlayButton: (props: { position: string }) => JSX.Element;
}
