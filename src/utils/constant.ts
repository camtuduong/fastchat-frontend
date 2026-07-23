const GIF_DEFAULT_QUERY = "String"; // Giá trị mặc định cho truy vấn tìm kiếm GIF
const GIF_PICKER_LIMIT = 24; // Số lượng GIF hiển thị trong picker
const GIF_FORMAT_FILTER = "gif"; // Định dạng GIF trong picker
const GIF_CONTENT_FILTER = "high"; // Mức độ lọc nội dung GIF trong picker (high, medium, low)

export {
  GIF_PICKER_LIMIT,
  GIF_FORMAT_FILTER,
  GIF_CONTENT_FILTER,
  GIF_DEFAULT_QUERY,
};

export const removeVietnameseTones = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss"; // Định dạng ngày giờ

export { DATE_FORMAT };
