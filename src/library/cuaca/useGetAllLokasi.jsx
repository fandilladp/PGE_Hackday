import axios from "axios";
import moment from "moment";
import { useQuery } from "react-query";

const getDataCuaca = () => {
  return axios.get(
    `/pgehack?tgl=${moment().subtract(1, "days").format("YYYY-MM-DD")}`
  );
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
