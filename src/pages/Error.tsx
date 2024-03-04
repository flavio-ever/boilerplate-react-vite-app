const ErrorPage: React.FC = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Oops!</h1>
          <p>Desculpe, pagina não encontrada.</p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
