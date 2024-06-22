import createClient from "./create";

//Ideally this should call directly the supabase client, but maybe calls the API in the future
const update = async (id: string, data: any) => {}

const remove = async (id: string) => {}

const get = async (id: string) => {}

const list = async () => {}

const clientService = {
  create: createClient,
  update,
  remove,
  get,
  list
}

export default clientService;