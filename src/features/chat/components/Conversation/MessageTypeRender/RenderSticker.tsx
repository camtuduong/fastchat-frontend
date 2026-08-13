type Props = {
  url: string;
  style: string;
};

export const RenderSticker = ({ url, style }: Props) => {
  return (
    <div>
      <video autoPlay loop muted src={url} className={style} />
    </div>
  );
};
