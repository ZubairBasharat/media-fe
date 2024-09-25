export const TransformResponse = (response: any) => {
  const transform = {
    code: response.code,
    data: response?.data?.data,
    pagination: {
      current_page: response?.data.current_page,
      to: response?.data.to,
      from: response?.data.from,
      last_page: response?.data.last_page,
      per_page: response?.data.per_page,
      total: response?.data.total
    }
  }
  return transform;
}
