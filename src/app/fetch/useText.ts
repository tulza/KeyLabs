import { useQuery } from '@tanstack/react-query'
const runtime = 'edge'
const fetchText = async (): Promise<string> => {
  const response = await fetch(`/1000-most-common-words.txt`, {
    cache: 'no-store',
  })
  return response.json()
}

export const useText = () => {
  const query = useQuery({
    queryKey: ['text'],
    queryFn: fetchText,
  })
  return query
}
