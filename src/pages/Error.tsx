import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();
  console.error(error);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Oops!</h1>
          <p>Desculpe, algum erro inesperado ocorreu.</p>
          <p>
            Erro: <i>{error?.statusText || error?.message}</i>
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
