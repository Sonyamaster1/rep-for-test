export async function getGroups(id: number) {
  try {
    const response = await fetch(`http://localhost:3001`)
    if (!response.ok) throw new Error(response.statusText)
    console.log(response.json())
    return response.json()
  } catch (err) {
    console.error(err.message || err)
  }
}
