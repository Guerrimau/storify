
interface IClientProps {
  data: any;
}

interface IClientResponse {}

type ICreateClient = (props: IClientProps) => Promise<IClientResponse>;

const createClient: ICreateClient = async ({ data }) => {
  return "use server";
};

export default createClient;