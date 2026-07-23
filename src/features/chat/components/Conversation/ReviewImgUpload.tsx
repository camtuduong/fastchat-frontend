type Props = {
  imgUrl: string;
};

export const ReviewImgUpload = ({ imgUrl }: Props) => {
  return (
    <img
      src={imgUrl}
      alt="preview"
      className="h-32 w-32 rounded-2xl object-cover shadow-md"
    />
  );
};
