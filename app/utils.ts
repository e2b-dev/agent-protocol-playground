export const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (response.ok) {
    return await response.json()
  }
  throw new Error(response.statusText)
}

export const downloadFile = (url: string, filename: string) => {
  fetch(url).then((t) =>
    t.blob().then((b) => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(b)
      a.setAttribute('download', filename)
      a.click()
    }),
  )
}
