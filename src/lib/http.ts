import type { AxiosResponse } from 'axios'

export async function httpWithRetry<T>(
  requestFn: () => Promise<AxiosResponse<T>>,
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<AxiosResponse<T>> {
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn()
    } catch (error: unknown) {
      lastError = error

      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        throw error
      }
    }
  }
}
