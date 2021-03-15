import './App.css';
// import { BasicTable } from './components/BasicTable';
// import { SortingTable } from './components/SortingTable';
// import { FilteringTable } from './components/FilteringTable';
// import { PaginationTable } from './components/PaginationTable';
import { FromParamsTable } from './components/FromParamsTable';
import { QueryParamProvider } from 'use-query-params';

function App() {
  return (
    <QueryParamProvider>
      <div className="App">
        {/* <BasicTable /> */}
        {/* <SortingTable /> */}
        {/* <FilteringTable /> */}
        {/* <PaginationTable /> */}
        <FromParamsTable />
      </div>
    </QueryParamProvider>
  );
}

export default App;
