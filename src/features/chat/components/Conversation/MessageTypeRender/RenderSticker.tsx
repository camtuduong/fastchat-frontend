type Props = {
  url: string;
  style: string;
  date: string;
};

export const RenderSticker = ({ url, style, date }: Props) => {
  return (
    <div title={date}>
      <video autoPlay loop muted src={url} className={style} />
    </div>
  );
};
