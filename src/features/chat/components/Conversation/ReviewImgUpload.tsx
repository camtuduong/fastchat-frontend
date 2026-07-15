type Props = {
  imgUrl: string;
};

export const ReviewImgUpload = ({ imgUrl }: Props) => {
  return (
    <img
      src={imgUrl}
      alt="preview"
      className="h-40 w-40 rounded-2xl object-cover shadow-md"
    />
  );
};
