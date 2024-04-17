import axios from "axios";
import { useQuery } from "react-query";

const getDataCuaca = () => {
  return axios.get(`/pgehack`);
};

const useGetAllLokasi = () => {
  const query = useQuery({
    queryFn: getDataCuaca,
    queryKey: ["lokasi"],
    select: (data) => {
      const filteredData = data.data;
      return filteredData;
    },
  });

  return query;
};

export default useGetAllLokasi;
