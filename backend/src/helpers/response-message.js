const successResponse = (data, status = 200) => ({ data: data || {}, status })

const errorResponse = (message, status = 400) => ({ data: { error: message }, status })

export {
  successResponse,
  errorResponse
}