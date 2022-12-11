import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import { getClients, createClient } from "../../services/api";
import ClientHeader from "./ClientHeader";
import CreateModal from "../../components/CreateModal";

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const handleSubmit = (form: IClient) => {
    dispatch({ type: "ADD_CLIENT", data: form });
    createClient(form);
    setIsModalOpen(false);
  }

  const handleSearch = (keyword: string) => {
    getClients().then((res) => {
      if (!!keyword) {
        const updatedClients = res.filter(client => client.firstName.toLowerCase().includes(keyword.toLocaleLowerCase()) || client.lastName.toLowerCase().includes(keyword.toLocaleLowerCase()));
        dispatch({ type: "SEARCH_CLIENT", data: updatedClients });
      } else {
        dispatch({ type: "FETCH_ALL_CLIENTS", data: res })
      }
    });
  };

  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  return (
    <Page>
      <ClientHeader createClient={() => setIsModalOpen(true)} searchClient={handleSearch}/>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={clients} />
      </Paper>
      {
        isModalOpen && (
          <CreateModal
            isOpen={true}
            submitForm={handleSubmit}
            handleClose={() => setIsModalOpen(false)} />  
        )
      }
    </Page>
  );
}

export default memo(Clients);
