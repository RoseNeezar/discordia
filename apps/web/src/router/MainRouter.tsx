import { useSession } from "next-auth/react";
import { FC } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";

const Homes: FC<{ data: any }> = ({ data }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/app/home">Public</Link>
      <h1>Ho---{data}</h1>
    </div>
  );
};
const UserHome: FC<{ it: any }> = ({ it }) => {
  const { data } = useSession();

  return (
    <div>
      {JSON.stringify(data, null, 2)}
      User index page
      <h1>{it}</h1>
    </div>
  );
};

const MainRouter: FC<{ sth: any }> = ({ sth }) => {
  return (
    <Routes>
      <Route path={`/app/*`} element={<Homes data={sth} />} />
      <Route path={`/app/home`} element={<UserHome it={sth} />} />
      <Route path="/" element={<Navigate replace to={`/app/`} />} />
    </Routes>
  );
};

export default MainRouter;
