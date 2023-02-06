import service from "./service";

export const createHttpRequest = async ({ endpoint, path, config }) => {
  try {
    const url = path ? `${endpoint}/${path}` : endpoint;
    const response = await service["request"]({ url, ...config });
    return response.data;
  } catch (error) {
    return error;
  }
};
