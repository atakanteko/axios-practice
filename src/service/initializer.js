import service from "./service";

export const createHttpRequest = async ({ method, endpoint, path, config }) => {
  try {
    const url = path ? `${endpoint}/${path}` : endpoint;
    const response = await service[method](url, { config });
    return response;
  } catch (error) {
    return error;
  }
};
