// api.js
export const BASE_URL = 'http://localhost:8080';

/**
 * HTTP 요청 함수 (GET, POST, PUT, DELETE)
 * @param {string} endpoint - 베이스 URL 뒤의 경로 (예: `/api/members/${memberId}/name`)
 * @param {Object} [data] - 요청에 포함할 데이터 (POST, PUT 요청에만 사용)
 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE)
 * @returns {Promise<any>} - 요청의 응답 데이터
 */
async function request(endpoint, options) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log('response',response);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * GET 요청 함수
 * @param {string} endpoint - 베이스 URL 뒤의 경로
 * @returns {Promise<any>} - 요청의 응답 데이터
 */
export async function get(endpoint) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await request(endpoint, options);
}

/**
 * POST 요청 함수
 * @param {string} endpoint - 베이스 URL 뒤의 경로
 * @param {Object} data - 요청에 포함할 데이터
 * @returns {Promise<any>} - 요청의 응답 데이터
 */
export async function post(endpoint, data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  console.log('로그로그', endpoint, options);

  return await request(endpoint, options);
  
}

/**
 * PUT 요청 함수
 * @param {string} endpoint - 베이스 URL 뒤의 경로
 * @param {Object} data - 요청에 포함할 데이터
 * @returns {Promise<any>} - 요청의 응답 데이터
 */
export async function put(endpoint, data) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return await request(endpoint, options);
}

/**
 * DELETE 요청 함수
 * @param {string} endpoint - 베이스 URL 뒤의 경로
 * @returns {Promise<any>} - 요청의 응답 데이터
 */
export async function del(endpoint) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await request(endpoint, options);
}

// api 객체로 내보내기
export default {
  get,
  post,
  put,
  del,
  BASE_URL,
};
