/**
 * 一時的な認証に関する処理をまとめたファイル。
 * （後で消す）
 * このファイルは、認証に関する処理をまとめたファイルです。
 * localStorageにトークンを保存したり、取得したりする処理を記述します。
 */

/**
 * setAuthToken
 * @param params
 */
export const setAuthToken = (params: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem('accessToken', params.accessToken);
  localStorage.setItem('refreshToken', params.refreshToken);
};

/**
 * getAuthToken
 * @returns
 */
export const getAuthToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    accessToken,
    refreshToken,
  };
};

/**
 * clearAuthToken
 */
export const clearAuthToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
