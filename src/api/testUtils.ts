export function mockFetchJson(responseBody: any) {
  return jest
    .spyOn(window, 'fetch')
    .mockImplementation(
      async (input: RequestInfo, init?: RequestInit | undefined) =>
        new Response(JSON.stringify(responseBody)),
    )
}
