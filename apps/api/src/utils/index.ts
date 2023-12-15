/**
 * Create a 200 response object
 * @param result BodyInit
 * @returns Response
 */
export const jsonResponse = (result: BodyInit) => {
  return new Response(result, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Create a 404 response object
 * @param result BodyInit
 * @returns Response
 */
export const createNotFountResponse = (message = 'Not Found') => {
  return new Response(message, {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
