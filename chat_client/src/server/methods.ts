import server from './server'

type AnyObjT = {
  [index: string]: unknown
}

export const get = async <T>(url: string, params: AnyObjT): Promise<Awaited<T>> => {
  const res = await server.get(url, { params })
  return res.data as Promise<Awaited<T>>
}

export const postByJson = async <T>(url: string, data: AnyObjT): Promise<Awaited<T>> => {
  const res = await server.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.data as Promise<Awaited<T>>
}
