import { Helmet } from 'react-helmet-async';
import TableList from '../components/formSearch/container/searches/TableList';


export default function SearchesList() {


  return (
    <>
      <Helmet>
        <title> Pesquisas | IPOPE </title>
      </Helmet>
      <TableList />
    </>
  );
}
